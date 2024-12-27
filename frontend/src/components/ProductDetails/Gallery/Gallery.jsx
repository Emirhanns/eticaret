import { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./Gallery.css";
import { useEffect } from "react";

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
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
      data-glide-dir=">"
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
    dots: true,
    infinite: singleProduct.img.length > 1, // Tek görsel varsa sonsuz kaydırmayı devre dışı bırak
    slidesToShow: 1, // Her seferinde sadece bir görsel göster
    slidesToScroll: 1,
    nextArrow: singleProduct.img.length > 1 ? <NextBtn /> : null, // Tek görsel varsa butonları gizle
    prevArrow: singleProduct.img.length > 1 ? <PrevBtn /> : null,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <Slider {...sliderSettings}>
          {singleProduct.img.map((itemImg, index) => (
            <div key={index} className="slider-item">
              <img
                src={`${itemImg}`}
                alt=""
                className={`img-fluid ${
                  activeImg.imgIndex === index ? "active" : ""
                } `}
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
  singleProduct: PropTypes.object,
};
