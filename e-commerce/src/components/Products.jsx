import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({product}) => {

  return (
    <Container>
      {product?.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
