import React, { useEffect, useState } from "react";
import logo from "../../components/assets/images/logo.png";
import {
  Container,
  LineDecorator,
  Section,
  Spacer,
  Title,
  Text,
} from "./transactionStyle";
import {
  Bottom,
  Info,
  PriceDetail,
  Image,
  Product,
  ProductDetail,
  ProductId,
  ProductName,
  ProductSize,
  Details,
  Hr,
  Button,
  SummaryItemText,
} from "../cart/style";
import useQueryCustom from "../../hooks/useQueryCustom.js";
import { thunkUserTypes } from "../../constants/thunkTypes";
import { getBillByUser, updateBillStatus } from "../../api/fetchers/user";
import { useAuth } from "../../utils/authProvider";
import moment from "moment";
import { toast } from "react-toastify";

const Transaction = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const auth = useAuth();
  const { isLoading, data, refetch } = useQueryCustom(
    thunkUserTypes.GET_BILL_BY_USER,
    () => getBillByUser(auth.user.userId)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refetch]);

  const handleCancelBill = async (bill) => {
    setIsRefresh(false);
    const { data } = await updateBillStatus(bill.deliveryId, {
      status: 'cancel',
      billId: bill.billId
    });
    if (data.status !== "OK") {
      toast.error("Có lỗi");
    } else {
      toast.success("Hủy đơn thành công");
      setIsRefresh(true);
    }
    setIsRefresh(false);
  };

  if (isLoading || isRefresh) return;
  return (
    <Container>
      <Section>
        <div>
          <Image style={{ width: 90 }} src={logo} />
          <Title>Lịch sử mua hàng</Title>
        </div>
      </Section>
      <LineDecorator />
      <Spacer margin="20px 0 0 0" />
      <Section>
        <Bottom style={{ width: "80%", margin: "0 auto" }}>
          <Info>
            {data?.map(data.pop, [...data])?.map((billItem) => (
              <>
                <Product
                  key={billItem.billId}
                  style={{ flexDirection: "column" }}
                >
                  {billItem.payDate ? (
                    <Title>
                      Ngày{" "}
                      {moment(billItem.payDate).subtract(10, "days").calendar()}
                    </Title>
                  ) : (
                    <Title>Thanh toán khi nhận hàng</Title>
                  )}
                  <Text>{billItem.address}</Text>
                  <Text style={{ color: "red" }}>
                    Phí vận chuyển: {billItem.feeDelivery.toLocaleString()} VND
                  </Text>
                  <Text style={{ color: "red" }}>
                    Tổng tiền: {billItem.totalPrice.toLocaleString()} VND
                  </Text>
                  <Text> Phương thức thanh toán: {billItem.paymentMethod}</Text>
                  <div className="f-col" style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      {billItem.products.map((product) => (
                        <div className="item" key={product.id}>
                          <ProductDetail style={{ width: "700px" }}>
                            <Image
                              style={{ width: "57px" }}
                              src={
                                "http://localhost:8080/api/v1/image/product/thumbnail/" +
                                product.thumbnail
                              }
                            />
                            <Details style={{ fontSize: "13px" }}>
                              <ProductName>
                                <b>Sản phẩm:</b> {product.name}
                              </ProductName>
                              <ProductId>
                                <b>Mã:</b> {product.id}
                              </ProductId>
                              <ProductId>
                                <b>Giảm giá:</b> {product.discount * 100}%
                              </ProductId>
                              <ProductSize>
                                <b>Giá: </b>
                                {product.price.toLocaleString()} VND
                              </ProductSize>
                              <ProductSize>
                                <b>Số lượng: </b>
                                {product.quantity.toLocaleString()}
                              </ProductSize>
                            </Details>
                          </ProductDetail>
                          <PriceDetail
                            style={{
                              fontSize: "15px",
                              flexDirection: "row",
                              columnGap: "10px",
                            }}
                          >
                            <b>
                              Thành tiền: {Math.ceil(product.pricePayed).toLocaleString()}{" "}
                              VND
                            </b>
                          </PriceDetail>
                        </div>
                      ))}
                    </div>
                    <PriceDetail>
                      {billItem.statusDelivery === "waiting" && (
                        <>
                          <Button
                            onClick={() => handleCancelBill(billItem)}
                          >
                            Hủy đơn hàng
                          </Button>
                          <br />
                          <SummaryItemText>Đơn hàng đã đặt</SummaryItemText>
                        </>
                      )}
                      {billItem.statusDelivery === "checked" && (
                        <SummaryItemText>
                          Đã xác nhận thông tin thanh toán
                        </SummaryItemText>
                      )}
                      {billItem.statusDelivery === "delivering" && (
                        <SummaryItemText>Đang giao hàng</SummaryItemText>
                      )}
                      {billItem.statusDelivery === "deliveried" && (
                        <SummaryItemText style={{ color: "blue" }}>
                          Đơn hàng đã nhận
                        </SummaryItemText>
                      )}
                      {billItem.statusDelivery === "cancel" && (
                        <SummaryItemText style={{ color: "red" }}>
                          Đã huỷ
                        </SummaryItemText>
                      )}
                    </PriceDetail>
                  </div>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
        </Bottom>
      </Section>
    </Container>
  );
};

export default Transaction;
