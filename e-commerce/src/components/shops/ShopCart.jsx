import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCartByUser } from "../../api/fetchers/cart";
import { useAuth } from "../../utils/authProvider";
import { toast } from "react-toastify";

const ShopCart = ({ productByBrand }) => {
  const [count, setCount] = useState(0);
  const auth = useAuth();
  const navigate = useNavigate();
  const increment = () => {
    setCount(count + 1);
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
      {productByBrand.map((product, index) => {
        return (
          <div className="box" key={index}>
            <div className="product mtop">
              <div className="img">
                <span className="discount">
                  {Math.fround(product?.discount?.percent * 100)}% Off
                </span>
                <img src={'http://localhost:8080/api/v1/image/product/thumbnail/' + product.thumbnail} alt="" />
                <div className="product-like">
                  <label>{count}</label> <br />
                  <i className="fa-regular fa-heart" onClick={increment}></i>
                </div>
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="price">
                  {product.discount.percent ? (
                    <h4>
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        {product.standCost.toLocaleString()}
                      </span>
                      <span>
                        {(
                          product.standCost -
                          product.standCost * product.discount.percent
                        ).toLocaleString()}
                      </span> 
                      VND
                    </h4>
                  ) : (
                    <h4>{product.standCost.toLocaleString()} VND</h4>
                  )}
                  <button onClick={() => handleAddToCart(product.id)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
                <Link
                  to={"/product/" + product?.id}
                  style={{
                    fontSize: "12px",
                    color: "#e94560",
                    textDecoration: "underline",
                  }}
                >
                  Chi tiết sản phẩm
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
