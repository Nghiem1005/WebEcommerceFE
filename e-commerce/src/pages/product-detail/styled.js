import styled from "styled-components";
import { mobile } from "../../responsive";
export const Container = styled.div``;
export const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

export const ImgContainer = styled.div`
  flex: 1;
`;

export const ImageSmallContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const Image = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

export const ImageSmall = styled.img`
  border-radius: 8px;
  background-color: #ebebeb;
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
  font-weight: 200;
`;

export const Desc = styled.p`
  margin: 20px 0px;
`;

export const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

export const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterSizeOption = styled.option``;

export const AddContainer = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

export const Amount = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

export const ButtonAction = styled.button`
  padding: 15px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  border-radius: 8px;
  border: ${(props) =>
    props.type === "filled" ? "none" : "2px solid #e94560"};
  background-color: ${(props) =>
    props.type === "filled" ? "#e94560" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "none" : "#f8f4f4"};
  }
`;

export const ButtonIcon = styled.button`
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
  font-size: 20px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgb(3 0 71 / 9%);
  & > .fa-plus {
    color: #e94560;
  }
  & > .fa-minus {
    color: #000;
  }
`;

export const Reviews = styled.div`
  color: #f02d34;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const InfoDescriptionContainer = styled.div`
  margin-top: 10px;
`;
export const InfoDescriptionTitleContainer = styled.div`
  width: 300px;
`;
export const InfoWrapper = styled.div`
  margin: 12px 0;
  display: flex;
`;
export const InfoDescriptionTitle = styled.h3`
  font-size: 16px;
  font-weight: normal;
`;

export const Marquee = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  overflow-x: hidden;
`;
export const MarqueeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;