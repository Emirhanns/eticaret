import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./Gallery.css";

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState({
    img: "",
    imgIndex: 0,
  });

  useEffect(() => {
    if (singleProduct.img && singleProduct.img.length > 0) {
      setActiveImg({ img: singleProduct.img[0], imgIndex: 0 });
    }
  }, [singleProduct.img]);

  const sliderSettings = {
    dots: true,
    infinite: singleProduct.img.length > 1, // Tek görsel varsa sonsuz kaydırmayı devre dışı bırak
    slidesToShow: 1, // Aynı anda sadece bir görsel göstermek için
    slidesToScroll: 1,
    nextArrow: singleProduct.img.length > 1 ? <NextBtn /> : null, // Tek görsel varsa butonları gizle
    prevArrow: singleProduct.img.length > 1 ? <PrevBtn /> : null,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <Slider {...sliderSettings}>
          {singleProduct.img.map((itemImg, index) => (
            <div key={index} className="image-slide">
              <img
                src={itemImg}
                alt={`Product ${index}`}
                className="img-fluid"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;

Gallery.propTypes = {
  singleProduct: PropTypes.shape({
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
