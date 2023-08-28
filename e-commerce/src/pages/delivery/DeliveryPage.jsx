import React, { useEffect, useRef, useState } from "react";
import logo from "../../components/assets/images/logo.png";
import {
  Container,
  ButtonSmall,
  Input,
  LineDecorator,
  Section,
  Spacer,
  Title,
  Select,
  Option,
} from "./styled";
import {
  Bottom,
  Image,
  Button,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
} from "../cart/style";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import useQueryCustom from "../../hooks/useQueryCustom.js";
import {
  createAddressByUser,
  createBillByUser,
  deleteAddressByUser,
  getAddressByUser,
  getUser,
  updateAddressByUser,
} from "../../api/fetchers/user";
import { pay } from "../../api/fetchers/pay";
import {
  getProvinces,
  getDistricts,
  getWards,
  feeDelivery,
} from "../../api/fetchers/masterdataAddress";
import { thunkCartTypes, thunkUserTypes } from "../../constants/thunkTypes";
import { useAuth } from "../../utils/authProvider";
import { getDetailCartByUser } from "../../api/fetchers/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeliveryPage = () => {
  const auth = useAuth();
  const [isShowForm, setIsShowForm] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [values, setValues] = useState(null);
  const [payMethod, setPayMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState({ total: 0 });
  const [serviceDelivery, setServiceDelivery] = useState(null);
  const [address, setAddress] = useState({
    province: null,
    district: null,
    ward: null,
  });
  const [dataDistrict, setDataDistrict] = useState(null);
  const [dataWard, setDataWard] = useState(null);
  const ref = useRef();
  const messageRef = useRef();
  const navigator = useNavigate();
  const {
    isLoading,
    data,
    refetch: r3,
  } = useQueryCustom(thunkUserTypes.GET_ADDRESS_USER, () =>
    getAddressByUser(auth.user.userId)
  );
  const {
    isLoading: isLoadingUser,
    data: dataUser,
    refetch: r1,
  } = useQueryCustom(thunkUserTypes.GET_USER, () => getUser(auth.user.userId));

  const {
    isLoading: isLoadingCart,
    data: dataCart,
    refetch: r2,
  } = useQueryCustom(thunkCartTypes.GET_DETAIL_CART_USER, getDetailCartByUser);
  const { isLoading: isLoadingProvinces, data: dataProvinces } = useQueryCustom(
    ["PROVINCES"],
    getProvinces
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    r1();
    r2();
    r3();
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedAddress(
        data.data.filter((address) => address.defaultAddress === true)[0]
      );
    }
  }, [data]);

  useEffect(() => {
    if (typeof JSON.parse(address.province) === "object") {
      const fetch = async () => {
        const { data } = await getDistricts({
          province_id: JSON.parse(address.province)?.ProvinceID,
        });
        setAddress({ ...address, district: null, ward: null });
        setDataDistrict(data);
      };
      fetch();
    }
  }, [address.province]);

  useEffect(() => {
    if (typeof JSON.parse(address.district) === "object") {
      const fetch = async () => {
        const { data } = await getWards({
          district_id: JSON.parse(address.district)?.DistrictID,
        });
        setDataWard(data);
      };
      fetch();
    }
  }, [address.district]);

  useEffect(() => {
    const fetch = async () => {
      if (selectedAddress) {
        if (Number(selectedAddress.address.codeArea) === 3695) {
          setServiceDelivery({ ...serviceDelivery, total: 0 });
        } else {
          const { data } = await feeDelivery(selectedAddress.address.codeArea);
          setServiceDelivery(data.data);
        }
      }
    };
    fetch();
  }, [serviceDelivery, selectedAddress]);

  const onSubmit = async (dataForm) => {
    const { apartmentNumber, ward, district, province, addressId, codeArea } =
      dataForm;
    const form = new FormData();
    if (
      ward === "default" ||
      district === "default" ||
      province === "default"
    ) {
      messageRef.current.innerText =
        "Trường Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã là bắt buộc";
    } else {
      form.append("apartmentNumber", apartmentNumber);
      form.append("defaultAddress", values === "2" ? true : false);
      if (isShowForm && !addAddress) {
        form.append("ward", ward);
        form.append("district", district);
        form.append("province", province);
        form.append("codeArea", codeArea);
        const { data } = await updateAddressByUser(
          auth.user.userId,
          addressId,
          form
        );
        if (data.status === "OK") {
          toast.success("Thêm địa chỉ thành công");
        } else {
          toast.error("Có lỗi");
        }
      } else {
        form.append("ward", JSON.parse(address.ward).WardName);
        form.append("district", JSON.parse(address.district).DistrictName);
        form.append("province", JSON.parse(address.province).ProvinceName);
        form.append("codeArea", JSON.parse(address.district).DistrictID);
        const { data } = await createAddressByUser(auth.user.userId, form);
        if (data.status === "OK") {
          toast.success("Thêm địa chỉ thành công");
        } else {
          toast.error("Có lỗi");
        }
      }
      r3();
      setIsShowForm(false);
      setAddAddress(false);
    }
  };

  const handlePay = async () => {
    if (payMethod === "cash") {
      if (dataCart) {
        let listProduct = dataCart.reduce(
          (acc, value) => [
            ...acc,
            { id: value.product.id, quantity: value.amount },
          ],
          []
        );
        const form = {
          paymentMethod: "Cash",
          // payDate: Date.now(),
          items: listProduct,
          feeDelivery: serviceDelivery.total,
          status: "waiting",
        };
        const { data: dataRes } = await createBillByUser(
          auth.user.userId,
          selectedAddress.address.id,
          form
        );
        if (dataRes.status === "OK") {
          toast.success("Mua hàng thành công!");
          navigator("/track");
        }
      }
    } else if (payMethod === "banking") {
      if (dataCart) {
        let listProduct = dataCart.reduce(
          (acc, value) => [
            ...acc,
            { id: value.product.id, quantity: value.amount },
          ],
          []
        );
        const form = {
          paymentMethod: "Cash",
          // payDate: Date.now(),
          items: listProduct,
          feeDelivery: serviceDelivery.total,
          status: "waiting",
        };
        const { data: dataRes } = await createBillByUser(
          auth.user.userId,
          selectedAddress.address.id,
          form
        );
        if (dataRes.status === "OK") {
          const form = {
            billId: dataRes.data.billId,
            price: dataRes.data.totalPrice,
            description: "Tra tien",
          };
          const { data } = await pay(form);
          if (data.message === "Successful.") {
            ref.current.href = data.payUrl;
            window.onload = document.getElementById("redirect").click();
          }
        }
      }
    } else {
      toast.error("Bạn chưa chọn phương thức thanh toán", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleUpdate = (address) => {
    setIsShowForm(true);
    setAddAddress(false);
    if (isShowForm && addAddress) {
      reset({
        addressId: null,
        apartmentNumber: "",
        ward: "",
        district: "",
        province: "",
      });
    }
    setValue("apartmentNumber", address.address.apartmentNumber);
    setValue("addressId", address.address.id);
    setValue("ward", address.address.ward);
    setValue("district", address.address.district);
    setValue("province", address.address.province);
    setValue("defaultAddress", address.defaultAddress ? "2" : "1");
    setValue("addressId", address.address.id);
    setValue("codeArea", address.address.codeArea);
  };

  if (isLoading || isLoadingUser || isLoadingCart || isLoadingProvinces) return;

  return (
    <Container>
      <Section>
        <div>
          <Image style={{ width: 90 }} src={logo} />
          <Title>Thanh toán</Title>
        </div>
      </Section>
      <Spacer margin="20px 0 0 0" />
      <LineDecorator />
      <Section>
        <div className="detail">Địa chỉ nhận hàng</div>
        <span className="detail-main">
          {dataUser.data.name} (+84) {dataUser.data.phone}
        </span>
        <span>
          {selectedAddress
            ? `${selectedAddress.address?.apartmentNumber}, ${selectedAddress.address?.ward}, ${selectedAddress.address?.district}, ${selectedAddress.address?.province} (Mặc định)`
            : "Không có địa chỉ mặc định"}
        </span>
      </Section>
      <Spacer margin="20px 0 0 0" />
      <Section>
        <Bottom style={{ gap: "20px", width: "800px", margin: "0 auto" }}>
          <Summary>
            {data.data.length > 0 ? (
              isShowForm && !addAddress ? (
                <Form
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  register={register}
                  values={values}
                  setValues={setValues}
                  errors={errors}
                  isShowForm={isShowForm}
                  addAddress={addAddress}
                  setIsShowForm={setIsShowForm}
                  setAddAddress={setAddAddress}
                  reset={reset}
                  getValues={getValues}
                  r3={r3}
                  address={address}
                />
              ) : !isShowForm && !addAddress ? (
                <>
                  <SummaryTitle>Danh sách địa chỉ</SummaryTitle>
                  {data.data.map((address, index) => (
                    <>
                      <div key={index}>
                        <SummaryItemText style={{ display: "block" }}>
                          {`${address.address.apartmentNumber}, ${address.address.ward}, ${address.address.district}, ${address.address.province}`}
                          {address.defaultAddress ? (
                            <span className="highlight">(Sử dụng)</span>
                          ) : null}
                          <span
                            className="change-btn"
                            onClick={() => handleUpdate(address)}
                          >
                            Thay đổi
                          </span>
                        </SummaryItemText>
                        <br />
                      </div>
                    </>
                  ))}
                  <ButtonSmall
                    onClick={() => {
                      setIsShowForm(true);
                      setAddAddress(true);
                    }}
                  >
                    Thêm địa chỉ
                  </ButtonSmall>
                </>
              ) : isShowForm && addAddress ? (
                <Form
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  register={register}
                  values={values}
                  setValues={setValues}
                  errors={errors}
                  isShowForm={isShowForm}
                  addAddress={addAddress}
                  setIsShowForm={setIsShowForm}
                  setAddAddress={setAddAddress}
                  reset={reset}
                  getValues={getValues}
                  address={address}
                  setAddress={setAddress}
                  dataProvinces={dataProvinces}
                  dataDistrict={dataDistrict}
                  dataWard={dataWard}
                  messageRef={messageRef}
                />
              ) : null
            ) : (
              <Form
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                values={values}
                setValues={setValues}
                errors={errors}
                isShowForm={isShowForm}
                addAddress={addAddress}
                setIsShowForm={setIsShowForm}
                setAddAddress={setAddAddress}
                address={address}
                setAddress={setAddress}
                dataProvinces={dataProvinces}
                dataDistrict={dataDistrict}
                dataWard={dataWard}
                messageRef={messageRef}
              />
            )}
          </Summary>
          <Summary>
            <SummaryTitle>Tổng tiền</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Tổng tiền sản phẩm</SummaryItemText>
              <SummaryItemPrice>
                {dataCart
                  .reduce(
                    (acc, value) =>
                      acc +
                      value.amount *
                        (value.product.standCost -
                          value.product.standCost *
                            value.product.discount.percent),
                    0
                  )
                  .toLocaleString()}{" "}
                VND
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Tiền vận chuyển</SummaryItemText>
              <SummaryItemText>
                {serviceDelivery?.total?.toLocaleString()} VND
              </SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Hình thức vận chuyển</SummaryItemText>
              <SummaryItemText>Chuyển phát nhanh</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Giảm giá</SummaryItemText>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng</SummaryItemText>
              <SummaryItemPrice>
                {(
                  dataCart.reduce(
                    (acc, value) =>
                      acc +
                      value.amount *
                        (value.product.standCost -
                          value.product.standCost *
                            value.product.discount.percent),
                    0
                  ) + serviceDelivery?.total
                ).toLocaleString()}{" "}
                VND
              </SummaryItemPrice>
            </SummaryItem>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng"
                />
                <FormControlLabel
                  value="banking"
                  control={<Radio />}
                  label="Thanh toán qua Momo"
                />
              </RadioGroup>
            </FormControl>
            <Button style={{ marginTop: "10px" }} onClick={handlePay}>
              Thanh toán
            </Button>
          </Summary>
        </Bottom>
      </Section>
      {/* <VoucherModal open={open} setOpen={setOpen} setVoucher={setVoucher} /> */}
      <a href rel="noreferrer" id="redirect" ref={ref}></a>
    </Container>
  );
};

const Form = ({
  handleSubmit,
  register,
  onSubmit,
  values,
  errors,
  setValues,
  isShowForm,
  addAddress,
  setIsShowForm,
  setAddAddress,
  address,
  setAddress,
  dataProvinces,
  dataDistrict,
  dataWard,
  getValues,
  r3,
  messageRef,
}) => {
  const auth = useAuth();
  const handleDelete = async () => {
    const { data } = await deleteAddressByUser(
      auth.user.userId,
      Number(getValues("addressId"))
    );
    if (data.status === "OK") {
      toast.success("Xóa địa chỉ thành công");
    } else {
      toast.error("Có lỗi");
    }
    r3();
    setIsShowForm(false);
    setAddAddress(false);
  };

  return (
    <>
      <SummaryTitle>
        {isShowForm && !addAddress ? "Chỉnh sửa" : "Thêm địa chỉ"}
      </SummaryTitle>
      <form
        id="form"
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginBottom: 0 }}
      >
        <Input
          type="text"
          placeholder="Details"
          {...register("apartmentNumber", { required: true })}
        />
        <Select
          {...register("province", { required: true })}
          value={address?.province || "default"}
          onChange={(e) => setAddress({ ...address, province: e.target.value })}
        >
          <Option disabled value={"default"}>
            Tỉnh/Thành phố
          </Option>
          {dataProvinces?.data?.map((province) => (
            <Option selecte={address.province} value={JSON.stringify(province)}>
              {province.ProvinceName}
            </Option>
          ))}
        </Select>
        <Select
          {...register("district", { required: true })}
          value={address?.district || "default"}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        >
          <Option disabled value={"default"}>
            Quận/Huyện
          </Option>
          {dataDistrict?.map((district) => (
            <Option key={district.DistrictID} value={JSON.stringify(district)}>
              {district.DistrictName}
            </Option>
          ))}
        </Select>
        <Select
          {...register("ward", { required: true })}
          value={address?.ward || "default"}
          onChange={(e) => setAddress({ ...address, ward: e.target.value })}
        >
          <Option disabled value={"default"}>
            Phường/Xã
          </Option>
          {dataWard?.length > 0
            ? dataWard.map((ward) => (
                <Option key={ward.WardID} value={JSON.stringify(ward)}>
                  {ward.WardName}
                </Option>
              ))
            : null}
        </Select>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          row
          name="controlled-radio-buttons-group"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        >
          <FormControlLabel
            value={"2"}
            control={<Radio />}
            label="Sử dụng địa chỉ này"
          />
          <FormControlLabel value={"1"} control={<Radio />} label="Không" />
        </RadioGroup>
        {errors.apartmentNumber && <span>Trường chi tiết là bắt buộc</span>}
        <span className="message" ref={messageRef}></span>
        <ButtonSmall>{isShowForm && !addAddress ? "Lưu" : "Thêm"}</ButtonSmall>
      </form>
      {isShowForm && !addAddress ? (
        <ButtonSmall
          onClick={() => {
            handleDelete();
          }}
          style={{
            background: "darkcyan",
            display: "block",
            width: "320px",
            margin: "10px auto",
          }}
        >
          Xóa địa chỉ
        </ButtonSmall>
      ) : null}
      <ButtonSmall
        onClick={() => {
          setIsShowForm(false);
          setAddAddress(false);
        }}
        style={{
          background: "grey",
          display: "block",
          width: "320px",
          margin: "10px auto",
        }}
      >
        Hủy bỏ
      </ButtonSmall>
    </>
  );
};
export default DeliveryPage;
