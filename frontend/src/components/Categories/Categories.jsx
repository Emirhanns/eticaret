import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Categories.css";
import { message } from "antd";

const Categories = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.error("Veri hatası:", error);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Kategoriler</h2>
        </div>
        <ul className="category-list">
          <li
            className={`category-item ${selectedCategory === null ? "selected" : ""}`}
            onClick={() => onCategorySelect(null)}
          >
            Tüm Ürünler
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              className={`category-item ${selectedCategory === category._id ? "selected" : ""}`}
              onClick={() => onCategorySelect(category._id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Categories.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default Categories;
