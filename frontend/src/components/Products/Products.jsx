import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Categories from "../Categories/Categories";  // Categories burada sadece bir kez yer alacak
import "./Products.css";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);  // Seçilen kategori
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
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)  // Kategoriye göre filtrele
    : products;

  return (
    <section className="products">
      <div className="container">
        <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />  {/* Categories burada sadece bir kez yer alacak */}
        <h2 className="section-title">Tüm Ürünler</h2>
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
    </section>
  );
};

export default Products;
