import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartProvider";
import { Spin, message, Select, Input, Table, Button, Modal } from "antd";
import { PlusOutlined, MinusOutlined, WhatsAppOutlined } from "@ant-design/icons";
import "./CartPage.css"; // CSS dosyasını düzenlemeyi unutmayın

const { Option } = Select;

const CartPage = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isIbanModalVisible, setIsIbanModalVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const cartItemTotals = cartItems.map((item) => item.price * item.quantity);
  const subTotals = cartItemTotals.reduce((prev, curr) => prev + curr, 0);
  const cargoFee = 15;
  const cartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handlePaymentSubmit = async () => {
    if (!firstName || !lastName || !address || !paymentMethod || !phoneNumber) {
      message.warning("Lütfen tüm alanları doldurunuz!");
      return;
    }

    if (paymentMethod === "IBAN") {
      setOrderNumber(`ORD-${Date.now()}`); // Sipariş numarası oluştur
      setIsIbanModalVisible(true);
      return;
    }

    await createOrder();
  };

  const createOrder = async () => {
    setLoading(true);

    try {
      const body = {
        userDetails: {
          firstName,
          lastName,
          phoneNumber,
        },
        address,
        paymentMethod,
        cargoFee: fastCargoChecked ? cargoFee : 0,
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        totalAmount: parseFloat(cartTotals),
        orderNumber, // Sipariş numarası ekleniyor
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Sipariş başarıyla oluşturuldu!");
        console.log("Order submitted successfully", data);
      } else {
        message.error(`Hata: ${data.error || "Bilinmeyen hata"}`);
        console.error("Order submission failed", data);
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Sipariş oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
      setIsIbanModalVisible(false);
    }
  };

  useEffect(() => {
    // Ekran boyutunu güncellemek için event listener ekliyoruz
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-content">
        {/* Sol: Sepet Özeti */}
        <div className="cart-summary">
          <h2>Sepet Özeti</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <img
                  src={item.img[0]}
                  alt={item.name}
                  className="item-thumbnail"
                />
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{item.price} TL</p>
                  <div className="quantity-controls">
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    />
                    <span className="quantity">{item.quantity}</span>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    />
                  </div>
                  <Button
                    type="danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Kaldır
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-totals">
            <p>Toplam: {cartTotals} TL</p>
          </div>
        </div>

        {/* Sağ: Ödeme Formu */}
        <div className="payment-form">
          <h2>Ödeme Sayfası</h2>
          <Button
            type="default"
            icon={<WhatsAppOutlined />}
            onClick={() => window.open("https://wa.me/5069513956", "_blank")}
            style={{ backgroundColor: "#25D366", color: "white" }}
          >
            WhatsApp ile İletişime Geç veya Sipariş Ver
          </Button>
          <div>
            <label>Ad:</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Adınızı giriniz"
            />
          </div>
          <div>
            <label>Soyad:</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyadınızı giriniz"
            />
          </div>
          <div>
            <label>Telefon Numarası:</label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Telefon numaranızı giriniz"
            />
          </div>

          <div>
            <label>Adres:</label>
            <Input.TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adresinizi giriniz"
              rows={4}
            />
          </div>
          <div>
            <label>Ödeme Yöntemi:</label>
            <Select
              placeholder="Ödeme yöntemi seçiniz"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
              style={{ width: "100%" }}
            >
              <Option value="IBAN">IBAN ile Ödeme</Option>
            </Select>
          </div>
          <Spin spinning={loading}>
            <Button
              className="payment-button"
              type="primary"
              onClick={handlePaymentSubmit}
              style={{ marginBottom: "10px" }}
            >
              Ödeme Yap
            </Button>
          </Spin>
          {/* WhatsApp Butonu */}
          
        </div>
      </div>

      {/* IBAN Modal */}
      <Modal
        title="IBAN ile Ödeme"
        open={isIbanModalVisible}
        onCancel={() => setIsIbanModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={createOrder}
          >
            Sipariş Oluştur
          </Button>,
        ]}
      >
        <p>IBAN: TR00 0000 0000 0000 0000 0000</p>
        <p>Sipariş Numaranız: <strong>{orderNumber}</strong></p>
        <p>Lütfen Açıklama Kısmına Sipariş Numaranızı Yazmayı Unutmayınız Aksi Halde Ürününüz Kargoya Verilmeyecektir</p>
      </Modal>
    </div>
  );
};

export default CartPage;
