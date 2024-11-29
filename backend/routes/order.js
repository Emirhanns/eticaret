const express = require("express");
const router = express.Router();
const Order = require("../models/Order.js"); // Order modelini dahil et

// Sipariş numarasını oluşturmak için fonksiyon
const generateOrderNumber = () => {
  const orderNumber = 'ORD-' + Date.now();  // Sipariş numarasını zaman damgasına dayalı oluşturuyoruz.
  console.log("Generated Order Number:", orderNumber); // Üretilen sipariş numarasını logla
  return orderNumber;
};

// Yeni sipariş oluşturma (POST)
router.post("/", async (req, res) => {
  try {
    const { userDetails, address, paymentMethod, cargoFee, products, totalAmount } = req.body;
    
    const orderNumber = generateOrderNumber(); // Sipariş numarasını oluştur

    const newOrder = new Order({
      userDetails,
      address,
      paymentMethod,
      cargoFee,
      products,
      totalAmount,
      orderNumber,  // Sipariş numarasını burada kullanıyoruz
    });

    await newOrder.save(); // Siparişi veritabanına kaydet

    console.log("New Order Created:", newOrder); // Siparişin tüm bilgilerini logla

    res.status(201).json({ orderNumber: newOrder.orderNumber }); // Sipariş numarasını döndür
  } catch (error) {
    console.error("Sipariş oluşturulurken hata oluştu:", error);
    res.status(500).json({ error: "Sipariş oluşturulamadı." });
  }
});

// Tüm siparişleri getirme (GET)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId", "name price orderNumber") // Product modelinde name ve price bilgilerini popülasyon yapıyoruz
      .exec();
    console.log("Popülasyon Sonucu:", orders);

    res.status(200).json(orders); // Sipariş verilerini döndürüyoruz
  } catch (error) {
    console.error("Siparişler alınırken hata oluştu:", error);
    res.status(500).json({ error: "Siparişler alınamadı." });
  }
});

module.exports = router;
