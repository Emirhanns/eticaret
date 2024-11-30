import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Categories from "../Categories/Categories";
import { Modal, Button } from "antd"; // Modal ve Button'ı Ant Design'dan ekliyoruz
import "./Products.css";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Seçilen kategori
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal görünürlüğü
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.error("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Kategori seçildiğinde filtreyi uygula
    setIsModalVisible(false); // Modal'ı kapat
  };

  const handleShowModal = () => {
    setIsModalVisible(true); // Modal'ı aç
  };

  const handleCancelModal = () => {
    setIsModalVisible(false); // Modal'ı kapat
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)  // Kategoriye göre filtrele
    : products;

  return (
    <section className="products">
      <div className="container">
        
        <h2 className="section-title">Tüm Ürünler</h2>
        <div className="category-menu-button">
          <Button
            type="primary"
            onClick={handleShowModal}
          >
            Kategori Seç
          </Button>
        </div>
        <div className="product-wrapper">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem productItem={product} key={product._id} />
            ))
          ) : (
            <p className="no-products-message">Henüz ürün bulunmamaktadır.</p>
          )}
        </div>
      </div>

      {/* Modal Kategorileri Seçme */}
      <Modal
        title="Kategori Seç"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null} // Footer kısmını kaldırabiliriz
        width={400} // Modal genişliğini ayarlayabiliriz
      >
        <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      </Modal>
    </section>
  );
};

export default Products;
