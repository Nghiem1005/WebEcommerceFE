import styled from "styled-components";
import Products from "../../components/Products";
import Newsletter from "../../components/newletter/Newletter";
import { mobile } from "../../responsive";
import { useNavigate } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { useQueryCustom } from "../../hooks";
import {
  thunkBrandTypes,
  thunkCategoryTypes,
  thunkProductTypes,
} from "../../constants/thunkTypes";
import {
  getAllProducts,
  getProductByBrand,
  getProductByCate,
  getProductSearch,
} from "../../api/fetchers/product";
import { getAllBrands } from "../../api/fetchers/brand";
import { getAllCategories } from "../../api/fetchers/category";
import { useEffect, useRef } from "react";
import { useState } from "react";
import useLocationQuery from "../../hooks/useLocationQuery";
import { makeStyles } from "@material-ui/core/styles";
import PaginationPage from "../../components/Pagination";

const useStyle = makeStyles((theme) => ({
  pagination: {
    width: "40%",
    bottom: "-100px",
    borderRadius: 6,
    margin: "2rem auto",
    padding: "4px",
  },
}));

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const query = useLocationQuery();
  const ref1 = useRef();
  const ref2 = useRef();
  const categoryId = query.get("categoryId");
  const brandId = query.get("brandId");
  const search = query.get("search");
  const page = query.get("page") || 1;
  const size = query.get("size") || 12;
  const { isLoading, data, refetch, isSuccess } = useQueryCustom(
    thunkProductTypes.GETALL_PRODUCT,
    () => getAllProducts({ size, page: Number(page) })
  );
  const { isLoading: isLoadingCategories, data: dataCategories } =
    useQueryCustom(thunkCategoryTypes.GETALL_CATEGORY, getAllCategories);
  const { isLoading: isLoadingBrands, data: dataBrands } = useQueryCustom(
    thunkBrandTypes.GETALL_BRAND,
    getAllBrands
  );

  // useEffect(() => {
  //   if (data) {
  //     setProduct(data.data);
  //   }
  // }, [data]);

  useEffect(() => {
    const fetch = async () => {
      if (!categoryId && !brandId && !search) {
        refetch();
        if (isSuccess) {
          setProduct(data.data);
        }
      }
      if (search && page && size) {
        ref2.current.value = null;
        ref1.current.value = null;
        const { data } = await getProductSearch({
          size,
          page: Number(page),
          search,
        });
        setProduct(data);
      }
      if (categoryId && page && size) {
        ref2.current.value = null;
        const { data } = await getProductByCate({
          size,
          page: Number(page),
          categoryId,
        });
        setProduct(data);
      }
      if (brandId && page && size) {
        ref1.current.value = null;
        const { data } = await getProductByBrand({
          size,
          page: Number(page),
          brandId,
        });
        setProduct(data);
      }
    };
    fetch();
  }, [refetch, categoryId, brandId, search, page, size, isSuccess]);

  if (isLoading || isLoadingCategories || isLoadingBrands) {
    return;
  }

  return (
    <div className="container">
      <Container>
        <Title>Sản phẩm</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Phân Loại</FilterText>
            <Select
              ref={ref1}
              defaultValue={categoryId ? categoryId : 1}
              onChange={(e) =>
                navigate(`/product?categoryId=${e.target.value}`)
              }
            >
              {dataCategories.data.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <FilterText>Hãng</FilterText>
            <Select
              ref={ref2}
              defaultValue={brandId ? brandId : 1}
              onChange={(e) => navigate(`/product?brandId=${e.target.value}`)}
            >
              {dataBrands.data.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Filter>
          {/* <Filter>
            <FilterText>Theo sản phẩm</FilterText>
            <Select defaultValue={"default"}>
              <Option value={"default"}>Mới nhất</Option>
              <Option>Giá </Option>
              <Option>Giá</Option>
            </Select>
          </Filter> */}
        </FilterContainer>
        {product.list ? (
          <>
            {search ? <h1>Kết quả tìm kiếm sản phẩm có "{search}"</h1> : null}
            <Products product={product?.list} />
            <Paper elevation={2} className={classes.pagination}>
              <PaginationPage
                totalPage={product?.totalPage}
                page={page}
                size={size}
                pageCur={"/product"}
              />
            </Paper>
          </>
        ) : (
          <div style={{textAlign: 'center',
            height: '400px',
            marginTop: '60px'}}>
            <h1>Không tìm thấy sản phẩm có "{search}"</h1>
          </div>
        )}
        <Newsletter />
      </Container>
    </div>
  );
};

export default ProductList;
