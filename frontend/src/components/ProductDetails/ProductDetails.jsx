import Gallery from "./Gallery/Gallery";
import PropTypes from "prop-types";
import Info from "./Info/Info";
import "./ProductDetails.css";

const ProductDetails = ({ singleProduct, setSingleProduct }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct} />
              <Info singleProduct={singleProduct} />
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
