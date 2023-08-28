import Newsletter from "../../components/newletter/Newletter";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import { useState } from "react";
import ProductMarquee from "../../components/product-marquee/ProductMarquee";
import "./ProductPage.css";
import {
  Container,
  Wrapper,
  ImgContainer,
  ImageSmallContainer,
  Image,
  ImageSmall,
  InfoContainer,
  InfoDescriptionContainer,
  InfoDescriptionTitle,
  InfoDescriptionTitleContainer,
  InfoWrapper,
  Title,
  Desc,
  Price,
  Filter,
  FilterColor,
  FilterContainer,
  FilterTitle,
  AddContainer,
  Amount,
  AmountContainer,
  ButtonAction,
  ButtonIcon,
  Reviews,
  Marquee,
  MarqueeWrapper,
} from "./styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryCustom } from "../../hooks";
import { thunkProductTypes } from "../../constants/thunkTypes";
import {
  getProduct,
  getFeedbackByProduct,
  addFeedbackByProduct,
} from "../../api/fetchers/product";
import { addCartByUser } from "../../api/fetchers/cart";
import { useEffect } from "react";
import { useRef } from "react";
import moment from "moment/moment";
import { useAuth } from "../../utils/authProvider";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [indexImage, setIndexImage] = useState(0);
  const [hover, setHover] = useState(false);
  const [indexComment, setIndexComment] = useState(null);
  const [dataFeedBack, setDataFeedBack] = useState({ content: "", vote: null });
  const [amount, setAmount] = useState(1);
  const location = useLocation();
  const { ProductId } = useParams();
  const navigate = useNavigate();
  const textRef = useRef();
  const messageRef = useRef();
  const auth = useAuth();
  const {
    isLoading: isLoadingProduct,
    data: dataProduct,
    refetch: refetchProduct,
  } = useQueryCustom(thunkProductTypes.GET_PRODUCT, () =>
    getProduct(ProductId)
  );
  const {
    isLoading: isLoadingFeedback,
    data: dataFeedback,
    refetch: refetchFeedback,
  } = useQueryCustom(thunkProductTypes.GET_PRODUCT_FEEDBACK, () =>
    getFeedbackByProduct({ productId: ProductId })
  );

  useEffect(() => {
    refetchProduct();
    refetchFeedback();
  }, [refetchProduct, refetchFeedback]);

  const handleAddToCart = async (productId, amount) => {
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
        setAmount(1);
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };
  const showOptionComment = (index) => {
    setHover(true);
    setIndexComment(index);
  };

  const handlePay = async (productId, amount) => {
    if (!!auth?.user?.userId) {
      const {
        data: { message, status },
      } = await addCartByUser({ productId, amount });
      if (status !== "OK") {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        navigate("/cart");
        setAmount(1);
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (dataFeedBack.content === "") {
      messageRef.current.innerText = "Trường nội dung là bắt buộc";
      return;
    }
    if (!!auth.user) {
      if (Number(dataFeedBack.vote) !== 0) {
        const form = new FormData();
        form.append("vote", Number(dataFeedBack.vote));
        form.append("content", dataFeedBack.content);
        form.append("user", Number(auth.user.userId));
        form.append("product", Number(ProductId));
        const { data } = await addFeedbackByProduct(form);
        if (data.status === "OK") {
          refetchFeedback();
          setDataFeedBack({ content: "", vote: 0 });
          toast.success("Phản hồi thành công", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error('Có lỗi');
        }
      } else {
        toast.warning("Bạn chưa vote kìa!");
      }
    } else {
      navigate("/login");
    }
  };

  if (isLoadingProduct || isLoadingFeedback) {
    return;
  }

  return (
    <div className="container">
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image
              src={
                "http://localhost:8080/api/v1/image/product/" +
                dataProduct?.product.images[indexImage]
              }
            />
            <ImageSmallContainer>
              {dataProduct?.product.images?.map((image, i) => (
                <ImageSmall
                  key={i}
                  src={"http://localhost:8080/api/v1/image/product/" + image}
                  onClick={() => setIndexImage(i)}
                  className={
                    i === indexImage
                      ? "small-image selected-image"
                      : "small-image"
                  }
                />
              ))}
            </ImageSmallContainer>
          </ImgContainer>
          <InfoContainer>
            <Title>{dataProduct?.product.name}</Title>
            <Reviews>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </Reviews>
            <Desc>{dataProduct?.product.description}</Desc>
            <Price>{dataProduct?.product.standCost} VND</Price>
            <Desc>Số lượng: {dataProduct?.product.amount}</Desc>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="gray" />
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <ButtonIcon
                  onClick={() =>
                    setAmount((prev) => {
                      if (prev < 2) {
                        return 1;
                      }
                      return prev - 1;
                    })
                  }
                >
                  <i className="fa-solid fa-minus"></i>
                </ButtonIcon>
                <Amount>{amount}</Amount>
                <ButtonIcon onClick={() => setAmount((prev) => prev + 1)}>
                  <i className="fa-solid fa-plus"></i>
                </ButtonIcon>
              </AmountContainer>
              <ButtonAction
                onClick={() => handleAddToCart(dataProduct.product.id, amount)}
              >
                THÊM VÀO GIỎ
              </ButtonAction>
              <ButtonAction
                type="filled"
                onClick={() => handlePay(dataProduct.product.id, amount)}
              >
                MUA NGAY
              </ButtonAction>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <InfoDescriptionContainer>
          <h2>Thông tin sản phẩm {dataProduct?.product.name}</h2>
          {dataProduct?.attribute?.map((attribute) => (
            <InfoWrapper key={attribute.id}>
              <InfoDescriptionTitleContainer>
                <InfoDescriptionTitle>
                  {attribute?.attribute?.name}:
                </InfoDescriptionTitle>
              </InfoDescriptionTitleContainer>
              <span>{attribute?.attribute?.value}</span>
            </InfoWrapper>
          ))}
        </InfoDescriptionContainer>
        <Wrapper />
        <div>
          <h2>Đánh giá</h2>
          <div className="post__container">
            <div className="post">
              {dataFeedback?.data?.list?.map((feedback, index) => (
                <div className="post__comment" key={feedback.id}>
                  <div className="a">
                    <Avatar
                      className="header-user-img"
                      alt="me"
                      src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                    />
                    <h3 className="comment-username">{feedback.userName}</h3>
                  </div>
                  <div style={{ marginLeft: "50px" }}>
                    <Rating
                      name="simple-controlled"
                      defaultValue={feedback.vote}
                      readOnly
                    />
                    ({feedback.vote})
                    <br />
                    <span className="comment-caption">{feedback.content}</span>
                  </div>
                  <div
                    className="a"
                    onMouseMove={() => showOptionComment(index)}
                    onMouseOut={() => setHover(false)}
                  >
                    <span className="comment-time">
                      {feedback.createDate
                        ? moment(feedback.createDate).fromNow()
                        : null}
                    </span>
                    <span className="comment-like">3 likes</span>
                    <a className="comment-reply" href="##">
                      Report
                    </a>
                    <FiMoreHorizontal
                      className={
                        index === indexComment && hover ? "block" : "none"
                      }
                    />
                  </div>
                </div>
              ))}
              <section className="post__comment-create">
                <div className="comment-create__wrapper">
                  <form onSubmit={onSubmit}>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Typography component="legend">
                        Đánh giá của bạn
                      </Typography>
                      <Rating
                        name="simple-controlled"
                        value={dataFeedBack.vote}
                        onChange={(event, newValue) =>
                          setDataFeedBack({ ...dataFeedBack, vote: newValue })
                        }
                      />
                    </Box>
                    <label className="input-sizer stacked">
                      <textarea
                        placeholder="Enter comment..."
                        ref={textRef}
                        value={dataFeedBack.content}
                        onChange={(e) =>
                          setDataFeedBack({
                            ...dataFeedBack,
                            content: e.target.value,
                          })
                        }
                        onKeyDownCapture={(e) => {
                          textRef.current.style.height = "auto";
                          textRef.current.style.height =
                            textRef.current.scrollHeight + "px";
                        }}
                      ></textarea>
                    </label>
                    <br />
                    <span className="message" ref={messageRef}></span>
                    <br />
                    <button className="btn" type="submit">
                      Đăng
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Wrapper />
        <Marquee>
          <h2>Bạn có thể thích</h2>
          <MarqueeWrapper className="track">
            {dataProduct?.product?.images.map((product, i) => (
              <ProductMarquee
                key={i}
                image={"http://localhost:8080/api/v1/image/product/" + product}
              />
            ))}
          </MarqueeWrapper>
        </Marquee>
        <Wrapper />
        <Newsletter />
        <Wrapper />
      </Container>
    </div>
  );
};

export default ProductPage;
