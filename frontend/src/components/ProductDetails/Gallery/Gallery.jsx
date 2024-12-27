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
    setActiveImg({ img: singleProduct.img[0], imgIndex: 0 });
  }, [singleProduct.img]);

  const sliderSettings = {
    dots: false,
    infinite: singleProduct.img.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: singleProduct.img.length > 1 ? <NextBtn /> : null,
    prevArrow: singleProduct.img.length > 1 ? <PrevBtn /> : null,
    afterChange: (current) => {
      setActiveImg({
        img: singleProduct.img[current],
        imgIndex: current,
      });
    },
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={activeImg.img} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <Slider {...sliderSettings}>
          {singleProduct.img.map((itemImg, index) => (
            <div key={index} className="thumb-wrapper">
              <img
                src={itemImg}
                alt={`Product Thumbnail ${index}`}
                className={`thumb ${
                  activeImg.imgIndex === index ? "active" : ""
                }`}
                onClick={() =>
                  setActiveImg({
                    img: itemImg,
                    imgIndex: index,
                  })
                }
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  singleProduct: PropTypes.shape({
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Gallery;
