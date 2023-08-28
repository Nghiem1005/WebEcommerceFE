import { API } from "../baseUrl";
import { a } from "./masterdataAddress";
import axios from "axios";

export const getUser = async (id) => {
  try {
    const response = await API.get(`/api/v1/user/${id}`);
    return response;
  } catch (error) {}
};

export const login = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);
    return response;
  } catch (error) {}
};

export const register = async (formData) => {
  try {
    const response = await API.post("/api/v1/user", formData);
    return response;
  } catch (error) {}
};

export const updateUSer = async (userId, updateUser) => {
  try {
    const response = await API.put(`/api/v1/user/${userId}`, updateUser);
    return response;
  } catch (error) {}
};

export const getAddressByUser = async (userId) => {
  try {
    const response = await API.get(`/api/v1/address/user?userId=${userId}`);
    return response;
  } catch (error) {}
};

export const createAddressByUser = async (userId, formData) => {
  try {
    const response = await API.post(
      `/api/v1/address/user?userId=${userId}`,
      formData
    );
    return response;
  } catch (error) {}
};

export const deleteAddressByUser = async (userId, addressId) => {
  try {
    const response = await API.delete(
      `/api/v1/address/user?userId=${userId}&addressId=${addressId}`);
    return response;
  } catch (error) {}
};

export const updateAddressByUser = async (userId, addressId, formData) => {
  try {
    const response = await API.put(
      `/api/v1/address/user?userId=${userId}&addressId=${addressId}`,
      formData
    );
    return response;
  } catch (error) {}
};

export const getBillByUser = async (userId) => {
  try {
    const response = await API.get(`/api/v1/bill/user?userId=${userId}`);
    if (response.data) {
      const promises = response.data.map((bill) =>
        a.get(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=${3456296}&from_district=3695&to_district=${bill.deliveryCodeArea}`)
      );
      const result = await axios.all(promises);
      const data = result.reduce(
        (acc, value, index) => [
          ...acc,
          {
            deliveryId: response.data[index].deliveryId,
            billId: response.data[index].billId,
            userName: response.data[index].userName,
            userId: response.data[index].userId,
            address: response.data[index].address,
            payDate: response.data[index].payDate,
            paymentMethod: response.data[index].paymentMethod,
            totalPrice: response.data[index].totalPrice,
            statusDelivery: response.data[index].statusDelivery,
            products: response.data[index].products,
            feeDelivery: value.data.data[0].service_id,
            methodDelivery: value.data.data[0].short_name
          },
        ],
        []
      );
      return data;
    }
  } catch (error) {}
};

export const createBillByUser = async (userId, addressId, formData) => {
  try {
    const response = await API.post(`/api/v1/bill?userId=${userId}&addressID=${addressId}`, formData);
    return response;
  } catch (error) {}
};

export const updateBillStatus = async (billId, updateData) => {
  try {
    const response = await API.put(`/api/v1/delivery?id=${billId}`, updateData);
    return response;
  } catch (error) {}
};
