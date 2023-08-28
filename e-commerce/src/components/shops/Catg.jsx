import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Catg = ({ brands }) => {
  const navigate = useNavigate();
  const data = [
    {
      cateImg: "./images/category/Brand-logo/apple_logo.png",
    },
    {
      cateImg: "./images/category/Brand-logo/samsung_logo.png",
    },
    {
      cateImg: "./images/category/Brand-logo/xiaomi_logo.png",
    },
    {
      cateImg: "./images/category/Brand-logo/Realme_logo.png",
    },
    {
      cateImg: "./images/category/Brand-logo/Vivo-logo.png",
    },
    {
      cateImg: "./images/category/Brand-logo/OPPO_LOGO.png",
    },
  ];
  const getProductBrand = (brandId) => {
    navigate(`/?brandId=${brandId}`)
  };

  return (
    <>
      <div className="category">
        <div className="chead d_flex">
          <h1> Thương hiệu </h1>
        </div>
        {brands.map((value, index) => {
          return (
            <div
              className="box f_flex"
              key={index}
              onClick={() => getProductBrand(value.id)}
            >
              <img src={data[index].cateImg} alt="" />
              <span>{value.name}</span>
            </div>
          );
        })}
        <Link to={"/product"}>
          <div style={{ textAlign: "center" }}>
            <button>Xem thêm</button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Catg;
