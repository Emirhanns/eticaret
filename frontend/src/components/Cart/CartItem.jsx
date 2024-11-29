import PropTypes from "prop-types";

const CartItem = ({ cartItem }) => {
  return (
    <>
      <td className="product-thumbnail">
        <img src={cartItem.img[0]} alt={cartItem.name} />
      </td>
      <td className="product-name">{cartItem.name}</td>
      <td className="product-price">{cartItem.price.toFixed(2)} TL</td>
      <td className="product-subtotal">
        ${(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
