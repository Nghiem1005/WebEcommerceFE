import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addCartByUser } from '../api/fetchers/cart';
import { toast } from "react-toastify";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const handleAddToCart = async () => {
    const { data: { message, status} } = await addCartByUser({productId: item.id, amount: 1})
    if(status !== 'OK') {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success('Thêm sản phẩm vào giỏ hàng thành công', {
        position: toast.POSITION.TOP_CENTER
    });
    }
  };
  return (
    <Container>
      <Circle />
      <Image src={'http://localhost:8080/api/v1/image/product/thumbnail/' + item.thumbnail} />
      <div className="price">
        <span>{item.name}</span>
        {item.discount.percent ? (
          <h4>
            $ 
            <span
              style={{
                textDecoration: "line-through",
                marginRight: "10px",
              }}
            >
              {item.standCost.toLocaleString()}
            </span>
            <span>{(item.standCost - (item.standCost * item.discount.percent)).toLocaleString()}</span>
          </h4>
        ) : (
          <h4>{item.standCost.toLocaleString()} VND</h4>
        )}
      </div>
      <Info>
        <Icon onClick={handleAddToCart}>
          <ShoppingCartOutlined />
        </Icon>
        <Link to={"/product/" + item.id}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        {/* <Icon>
          <FavoriteBorderOutlined />
        </Icon> */}
      </Info>
    </Container>
  );
};

export default Product;
