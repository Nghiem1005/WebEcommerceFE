import React, { useEffect, useState } from "react";
import Home from "../../components/MainPage/Home";
import FlashDeals from "../../components/flashDeals/FlashDeals";
import TopCate from "../../components/top/TopCate";
import Discount from "../../components/discount/Discount";
import Shop from "../../components/shops/Shop";
import Annocument from "../../components/annocument/Annocument";
import Wrapper from "../../components/wrapper/Wrapper";
import {
  thunkBrandTypes,
  thunkCategoryTypes,
  thunkProductTypes,
} from "../../constants/thunkTypes";
import { getAllCategories } from "../../api/fetchers/category";
import { useQueryCustom } from "../../hooks";
import { getAllBrands } from "../../api/fetchers/brand";
import { getProductByBrand, getProductByDiscount } from "../../api/fetchers/product";
import useLocationQuery from "../../hooks/useLocationQuery";

const Pages = ({ productItems, addToCart, showSidebarCategory }) => {
  const query = useLocationQuery();
  const page = query.get("page") || 1;
  const size = query.get("size") || 9;
  const brandId = query.get("brandId") || 1;
  const { isLoading: isLoadingCategories, data: dataCategories, refetch: r1 } =
    useQueryCustom(thunkCategoryTypes.GETALL_CATEGORY, getAllCategories);
  const { isLoading: isLoadingProductDiscount, data: dataProductDiscount, refetch: r2 } =
    useQueryCustom(thunkProductTypes.GET_PRODUCT_BY_DISCOUNT, getProductByDiscount);
  const { isLoading: isLoadingBrands, data: dataBrands, refetch: r3 } = useQueryCustom(
    thunkBrandTypes.GETALL_BRAND,
    getAllBrands
  );
  const {
    isLoading: isLoadingProductByBrand,
    data: dataProductByBrand,
    refetch: r4,
  } = useQueryCustom(thunkProductTypes.GET_PRODUCT_BY_BRAND, () =>
    getProductByBrand({ size, page: Number(page), brandId })
  );

  useEffect(() => {
    r1();
    r2();
    r3();
    r4();
  },[])

  useEffect(() => {
    if (brandId && size && page) {
      const fetch = async () => {
        await r4();
      };
      fetch();
    }
  }, [brandId, size, page, r4]);

  if (isLoadingCategories || isLoadingBrands || isLoadingProductByBrand || isLoadingProductDiscount) {
    return;
  }

  return (
    <>
      <Home
        CartItem={addToCart}
        categories={dataCategories.data}
        showSidebarCategory={showSidebarCategory}
      />
      <FlashDeals productItems={dataProductDiscount.data.slice(-10)} addToCart={addToCart} />
      {/* <TopCate /> */}
      {/* <NewArrivals /> */}
      <Discount productDiscount={dataProductDiscount.data.slice(-0, 8)}/>
      <Shop
        page={page}
        size={size}
        totalPage={dataProductByBrand.data.totalPage}
        brands={dataBrands.data}
        productByBrand={dataProductByBrand.data.list}
      />
      <Annocument />
      <Wrapper />
    </>
  );
};

export default Pages;
