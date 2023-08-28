import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../api/baseUrl.js";
import { getDetailCartByUser } from "../../api/fetchers/cart.js";
import { thunkCartTypes } from "../../constants/thunkTypes.js";
import useQueryCustom from "../../hooks/useQueryCustom";
import { useAuth } from "../../utils/authProvider.js";
import {
  Container,
  Wrapper,
  Top,
  Title,
  TopButton,
  TopTexts,
  TopText,
  Bottom,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductName,
  ProductPrice,
  ProductSize,
  Image,
  Details,
  Hr,
  Button,
  ButtonIcon,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
} from "./style.js";

const CartPage = () => {
  const [amount, setAmount] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { isLoading, data, refetch } = useQueryCustom(
    thunkCartTypes.GET_DETAIL_CART_USER,
    getDetailCartByUser
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAmount(() =>
        data?.reduce(
          (acc, { amount, product: { id } }) => [
            ...acc,
            { id, quantity: amount },
          ],
          []
        )
      );
    }, 1000);
    return () => {
      refetch();
      clearTimeout(timeoutId);
    };
  }, [data]);

  const handleAddToCart = async () => {
    if (!!auth.user?.userId) {
      if (data.length > 0) {
        const dataRes = amount.map((product) =>
          API.post(
            `/api/v1/cart/product?productId=${product.id}&amount=${product.quantity}`
          )
        );
        const result = await axios.all(dataRes);
        result.forEach(({ data }) => {
          if (data.status !== "OK") {
            toast.error("Có lỗi");
          }
        });
        navigate("/delivery");
      } else {
        toast.error("Không có sản phẩm nào trong giỏ hàng");
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  if (isLoading) return;

  return (
    <div className="container">
      <Container>
        <Wrapper>
          <Title>Giỏ hàng</Title>
          <Top>
            <Link to={"/product"}>
              <TopButton>Tiếp tục mua hàng</TopButton>
            </Link>
            <TopTexts>
              <TopText>
                Sản phẩm trong giỏ(
                {amount?.reduce((amount, product) => amount + product.quantity, 0)})
              </TopText>
              <TopText>Sản phẩm yêu thích (0)</TopText>
            </TopTexts>
            <TopButton
              type="filled"
              onClick={() => {
                if (data.length > 0) {
                  navigate("/delivery");
                } else {
                  toast.error("Không có sản phẩm nào trong giỏ hàng");
                }
              }}
            >
              Thanh toán
            </TopButton>
          </Top>
          <Bottom>
            <Info>
              {data?.map((product, index) => (
                <>
                  <Product key={product.product.id}>
                    <ProductDetail>
                      <div className="w-100">
                        <Image
                          src={
                            "http://localhost:8080/api/v1/image/product/thumbnail/" +
                            product.product.thumbnail
                          }
                        />
                      </div>
                      <Details>
                        <ProductName>
                          <b>Sản phẩm:</b> {product.product.name.toUpperCase()}
                        </ProductName>
                        <ProductId>
                          <b>Mã sản phẩm:</b> {product.product.id}
                        </ProductId>
                        <ProductColor color="black" />
                        <ProductSize>
                          <b>Giảm giá(%):</b> {product.product.discount.percent}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ButtonIcon
                          onClick={() =>
                            setAmount(
                              amount?.map((obj) => {
                                if (obj.id === product.product.id) {
                                  if (obj.quantity < 1) {
                                    obj.quantity = 0;
                                  } else {
                                    obj.quantity -= 1;
                                  }
                                  return { ...obj, quantity: obj.quantity };
                                }
                                return obj;
                              })
                            )
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </ButtonIcon>
                        <ProductAmount>
                          {amount.length > 0 ? amount[index]?.quantity : 0}
                        </ProductAmount>
                        <ButtonIcon
                          onClick={() => {
                            setAmount((prev) =>
                              prev?.map((obj) =>
                                obj.id === product.product.id
                                  ? { ...obj, quantity: obj.quantity + 1 }
                                  : obj
                              )
                            );
                          }}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </ButtonIcon>
                      </ProductAmountContainer>
                      <TopText style={{ textDecoration: "none" }}>
                        Đã thêm {amount[index]?.quantity} sản phẩm
                      </TopText>
                      <ProductPrice>
                        {amount.length > 0
                          ? (
                              (product.product.standCost -
                                product.product.discount.percent *
                                  product.product.standCost) *
                              amount[index]?.quantity
                            ).toLocaleString()
                          : product.amount}{" "}
                        VND
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>Tổng tiền tạm tính</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Tổng tiền sản phẩm</SummaryItemText>
                <SummaryItemPrice>
                  {amount?.length > 0 &&
                    data
                      ?.reduce(
                        (acc, value, index) =>
                          acc +
                          amount[index]?.quantity *
                            (value.product.standCost -
                              value.product.discount.percent *
                                value.product.standCost),
                        0
                      )
                      .toLocaleString()}
                  VND
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Tổng</SummaryItemText>
                <SummaryItemPrice>
                  {amount?.length > 0
                    ? data
                        ?.reduce(
                          (acc, value, index) =>
                            acc +
                            amount[index]?.quantity *
                              (value.product.standCost -
                                value.product.discount.percent *
                                  value.product.standCost),
                          0
                        )
                        .toLocaleString()
                    : 0}
                  VND
                </SummaryItemPrice>
              </SummaryItem>
              <Button onClick={handleAddToCart}>Thanh toán</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </div>
  );
};

export default CartPage;
