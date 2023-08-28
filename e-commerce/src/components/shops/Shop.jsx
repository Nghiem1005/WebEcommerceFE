import { Paper } from "@material-ui/core";
import React from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import PaginationPage from "../../components/Pagination";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  pagination: {
    width: '40%',
    bottom: "-100px",
    borderRadius: 6,
    margin: "2rem auto",
    padding: "4px",
  },
}));

const Shop = ({ page, size, totalPage, brands, productByBrand }) => {
  const classes = useStyle();
  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Catg brands={brands}/>
          <div className="contentWidth">
            <div className="heading d_flex" style={{ alignItems: 'center'}}>
              <div className="heading-left row  f_flex">
                <h2>Sản phẩm</h2>
              </div>
              <div className="heading-right row ">
                <span>Xem tất cả</span>
                <i className="fa-solid fa-caret-right"></i>
              </div>
            </div>
            <div className="product-content  grid1">
              <ShopCart productByBrand={productByBrand} />
            </div>
              <Paper elevation={2} className={classes.pagination}>
                <PaginationPage totalPage={totalPage} page={page} size={size}/>
              </Paper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
