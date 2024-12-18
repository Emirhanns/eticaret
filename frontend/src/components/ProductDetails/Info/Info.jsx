import PropTypes from "prop-types";
import "./Info.css";
import { useContext, useRef } from "react";
import { CartContext } from "../../../context/CartProvider";

const Info = ({ singleProduct }) => {
  const quantityRef = useRef();
  const { addToCart, cartItems } = useContext(CartContext);
  const originalPrice = singleProduct.price.current;
  const discountPercentage = singleProduct.price.discount;

  // İndirimli fiyatı hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredCard = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
     
      <div className="product-price">
        {/* Fiyatlar eşitse yalnızca orijinal fiyatı göster */}
        {discountedPrice !== originalPrice ? (
          <>
            <s className="old-price">{originalPrice.toFixed(2)} TL</s>
            <strong className="new-price">{discountedPrice.toFixed(2)} TL</strong>
          </>
        ) : (
          <strong className="new-price">{originalPrice.toFixed(2)} TL</strong>
        )}
      </div>

      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></div>

      <form className="variations-form">
        <div className="variations">
          <div className="cart-button">
            <span>Adet:</span>
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            
            <button
              className="btn btn-sm btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCard}
              onClick={() =>
                addToCart({
                  ...singleProduct,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object,
};
