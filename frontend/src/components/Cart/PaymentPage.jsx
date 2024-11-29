import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const PaymentPage = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePaymentSubmit = async () => {
    if (!firstName || !lastName || !address || !paymentMethod) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
  
    const orderData = {
      userDetails: { firstName, lastName },
      address,
      paymentMethod,
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      cargoFee: fastCargoChecked ? 15 : 0,
      totalAmount: cartTotals,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/orders/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        alert("Siparişiniz başarıyla oluşturuldu!");
        navigate("/"); // Ana sayfaya yönlendirin
      } else {
        alert("Sipariş oluşturulamadı. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Sipariş oluşturulurken hata:", error);
    }
    
  console.log("Payment Submitted", { address, paymentMethod });
  alert("Ödeme işleminiz tamamlandı!");
  navigate("/"); // Ana sayfaya yönlendir
  };



  return (
    <div className="payment-page">
      <h2>Ödeme Sayfası</h2>
      <div>
        <label>Adres:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Adresinizi giriniz"
          rows={4}
        />
      </div>
      <div>
        <label>Ödeme Yöntemi:</label>
        <div>
          <input
            type="radio"
            id="iban"
            name="paymentMethod"
            value="IBAN"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="iban">IBAN ile Ödeme</label>
        </div>
        <div>
          <input
            type="radio"
            id="kapida"
            name="paymentMethod"
            value="Kapıda Ödeme"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="kapida">Kapıda Ödeme</label>
        </div>
      </div>
      <button className="btn btn-lg" onClick={handlePaymentSubmit}>
        Ödeme Yap
      </button>
    </div>
  );
};

export default PaymentPage;
