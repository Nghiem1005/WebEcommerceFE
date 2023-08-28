import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { addCartByUser } from "../../api/fetchers/cart";
import { useAuth } from "../../utils/authProvider";
import { toast } from "react-toastify";
import useWindowSize from "../../hooks/useWindowSize";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};
const FlashCard = ({ productItems }) => {
  const [count, setCount] = useState(0);
  const auth = useAuth();
  const windowSize = useWindowSize()
  const navigate = useNavigate();
  const increment = () => {
    setCount(count + 1);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: windowSize.width <= 560 ? 1 : 560 < windowSize.width && windowSize.width <= 840 ? 3 : 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleAddToCart = async (productId, amount = 1) => {
    if (!!auth.user?.userId) {
      const {
        data: { message, status },
      } = await addCartByUser({ productId, amount });
      if (status !== "OK") {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItem) => {
          return (
            <div className="box mobile" key={productItem.id}>
              <div className="product mtop">
                <div className="img">
                  <Link to={"/product/" + productItem.id}>
                    <span className="discount">
                      {(productItem.discount.percent * 100).toString().slice(0,2)}% Off
                    </span>
                    <img
                    style={{ width: '100%'}}
                      src={
                        "http://localhost:8080/api/v1/image/product/thumbnail/" +
                          productItem.thumbnail ||
                        "https://ladesignconcepts.com/wp-content/themes/freshclicks2015_10ladc/images/shop-cart.png"
                      }
                      alt=""
                    />
                  </Link>
                  <div className="product-like">
                    <label>{count}</label> <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div>
                </div>
                <div className="product-details">
                  <h3>
                    {windowSize.width <= 840 ? `${productItem.name.substring(0, 20)}...` : `${productItem.name.substring(0, 25)}...`} 
                  </h3>
                  <div className="rate">
                    <Rating
                      name="half-rating"
                      defaultValue={productItem.vote}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="price">
                    <h4>
                      <span className="deals"
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        {productItem.standCost.toLocaleString()}
                      </span>
                      <span>
                        {(
                          productItem.standCost - productItem.price
                        ).toLocaleString()}
                      </span>
                      VND
                    </h4>
                    <button onClick={() => handleAddToCart(productItem.id)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default FlashCard;
