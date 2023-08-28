import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../newarrivals/style.css";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

const Dcard = ({ productDiscount }) => {
  const windowSize = useWindowSize()
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: windowSize.width <= 540 ? 2 : 540 < windowSize.width && windowSize.width <= 840 ? 3 : 5,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <Slider {...settings}>
        {productDiscount.map((value, index) => {
          return (
            <Link to={"/product/" + value.id} key={value.id}>
              <div className="box product" style={{ height: '200px'}}>
                <div className="img" style={{ height: "60%" }}>
                  <img
                    src={
                      "http://localhost:8080/api/v1/image/product/thumbnail/" +
                      value.thumbnail
                    }
                    alt=""
                    width="100%"
                    height={"100%"}
                  />
                </div>
                <h4>{value.name.substring(0, 8)}...</h4>
                <span>
                  
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginRight: "10px",
                    }}
                  >
                    {value.standCost.toLocaleString()}
                    
                  </span>
                  <span>
                    {(value.standCost - value.price).toLocaleString()}
                  </span>
                  VND
                </span>
              </div>
            </Link>
          );
        })}
      </Slider>
    </>
  );
};

export default Dcard;
