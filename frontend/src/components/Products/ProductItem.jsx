import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./ProductItem.css";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );

  const originalPrice = productItem.price.current || 0;
  const discountPercentage = productItem.price.discount || 0;

  // İndirimli fiyatı hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  // Ürün detayına yönlendirme işlevi
  const goToDetails = () => {
    navigate(`/product/${productItem._id}`);
  };

  return (
    <div className="product-item">
  <div className="product-image" onClick={goToDetails}>
    <img src={productItem.img[0]} alt={productItem.name} className="img1" />
  </div>
  <div className="product-info">
    <h3 className="product-title" onClick={goToDetails}>
      {productItem.name}
    </h3>
    <div className="product-prices">
      <strong className="new-price">
        {discountedPrice.toFixed(2)} TL
      </strong>
      {productItem.price.discount > 0 && (
        <span className="old-price">
          {originalPrice.toFixed(2)} TL
        </span>
      )}
    </div>
    {productItem.price.discount > 0 && (
      <span className="product-discount">
        -{productItem.price.discount}%
      </span>
    )}
  </div>
  <div className="product-action">
    <button
      className="add-to-cart-btn"
      onClick={() =>
        addToCart({
          ...productItem,
          price: discountedPrice,
        })
      }
      disabled={filteredCart}
    >
      {filteredCart ? "Sepette" : "Sepete Ekle"}
    </button>
  </div>
</div>

  );
};

export default ProductItem;

ProductItem.propTypes = {
  productItem: PropTypes.object.isRequired,
};
