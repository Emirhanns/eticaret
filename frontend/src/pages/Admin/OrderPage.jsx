import React, { useEffect, useState } from "react";
import { Spin, Table, message } from "antd";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/orders`);
          if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          const errorData = await response.json();
          message.error(`Hata: ${errorData.error || "Siparişler alınamadı."}`);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        message.error("Veriler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Ant Design Tablo Kolonları
  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: ["userDetails", "firstName"], // userDetails.firstName içeriğini gösterir
      key: "firstName",
    },
    {
      title: "Müşteri Soyadı",
      dataIndex: ["userDetails", "lastName"], // userDetails.lastName içeriğini gösterir
      key: "lastName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: ["userDetails", "phoneNumber"], // userDetails.phoneNumber içeriğini gösterir
      key: "phoneNumber",
    },
    
    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Toplam Tutar",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Ürünler",
      dataIndex: "products",
      key: "products",
      render: (products) =>
        products
          .map((product, index) => {
            // Null ve undefined kontrolü
            const productName = product.productId ? product.productId.name : "Bilinmeyen Ürün";
            return `${productName} (Adet: ${product.quantity})`;
          })
          .join(" | "),
    },
    {
      title: "Sipariş Numarası",
      dataIndex: "orderNumber",
      key: "orderNumber",
      
    },
  ];

  return (
    <div>
      <h1>Siparişler</h1>
      <Spin spinning={loading}>
        <Table
          dataSource={orders}
          columns={columns}
          rowKey={(record) => record._id} // Her satır için benzersiz bir key
        />
      </Spin>
    </div>
  );
};

export default OrderPage;
