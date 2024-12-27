import { useState, useContext } from "react";
import Proptypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../../context/CartProvider";
import { message } from "antd"; // Ant Design için uyarılar
import "./Header.css";

const Header = ({ setIsSearchShow }) => {
  const { cartItems } = useContext(CartContext);
  const user = localStorage.getItem("user");
  const { pathname } = useLocation();
  const [query, setQuery] = useState(""); // Arama sorgusu
  const [searchResults, setSearchResults] = useState([]); // Arama sonuçları
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // API URL'si

  // Arama işlemini gerçekleştiren fonksiyon
  const handleSearch = async (e) => {
    const productName = e.target.value.trim();
    setQuery(productName);

    if (productName.length === 0) {
      setSearchResults([]); // Boş sorgu olduğunda sonuçları temizle
      return;
    }

    setLoading(true); // Arama başlatıldığında loading durumunu aktif et

    try {
      const res = await fetch(`${apiUrl}/api/products/search/${productName}`);
      if (!res.ok) {
        message.error("Ürün getirme hatası!");
        return;
      }

      const data = await res.json();
      console.log(data)
      setSearchResults(data); // Arama sonuçlarını güncelle
    } catch (error) {
      console.log(error);
      message.error("Arama hatası!");
    } finally {
      setLoading(false); // Arama tamamlandığında loading durumunu kapat
    }
  };

  return (
    <header>
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-left">
              <Link to={"/"} className="logo">
                <img src="img/logom.png" alt="Logo" />
              </Link>
            </div>


            <div className="header-center">
              {/* Arama Inputu */}
              <div className="dropdown">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Ürün Ara..."
                  value={query}
                  onChange={handleSearch} // Her harf değişiminde arama fonksiyonu tetiklenecek
                />
                {loading && <div className="loading">Yükleniyor...</div>}
                <div className="dropdown-menu">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, index) => (
                      <Link
                        key={index}
                        to={`/product/${item._id}`} // item._id'yi kullanıyoruz
                        className="dropdown-item"
                      >
                        <div className="dropdown-item-content">
                          {/* Ürün Resmi (ilk resim) */}
                          {item.img && item.img[0] && (
                            <img
                              src={item.img[0]} // İlk resmi alıyoruz
                              alt={item.name}
                              className="dropdown-item-image"
                            />
                          )}
                          {/* Ürün Adı */}
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="dropdown-item">Sonuç bulunamadı</div>
                  )}

                </div>
              </div>
            </div>

            <div className="header-right">
              <div className="header-right-links">
                {/* <Link to={"/auth"} className="header-account">
                  <i className="bi bi-person"></i>
                </Link> */}

                <div className="header-cart">
                  <Link to={"/cart"} className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">
                      {cartItems.length}
                    </span>
                  </Link>
                </div>

                {user && (
                  <button
                    className="search-button"
                    onClick={() => {
                      if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
                        localStorage.removeItem("user");
                        window.location.href = "/";
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  setIsSearchShow: Proptypes.func,
};
