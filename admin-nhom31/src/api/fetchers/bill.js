import { API } from "../baseUrl";
import axios from "axios";

export const getAllBillsByStatus = async (statusBill) => {
  try {
    const response = await API.get(
      `/api/v1/delivery/status?status=${statusBill}`
    );
    if (response.data) {
      const promises = response.data.map((bill) =>
        API.get(`/api/v1/bill/${bill.billId}`)
      );
      const result = await axios.all(promises);
      const data = result.reduce(
        (acc, value, index) => [
          ...acc,
          {
            deliveryId: response.data[index].id,
            billId: value.data.billId,
            customer: value.data.userName,
            userId: value.data.userId,
            address: value.data.address,
            payDate: value.data.payDate,
            paymentMethod: value.data.paymentMethod,
            totalPrice: value.data.totalPrice,
            status: response.data[index].status,
            products: value.data.products,
            shipperPhone: response.data[index].shipperPhone,
            shipperName: response.data[index].shipperName,
          },
        ],
        []
      );
      return data;
    }
  } catch (error) {}
};

export const updateBillStatus = async (billId, updateData) => {
  try {
    const response = await API.put(`/api/v1/delivery?id=${billId}`, updateData);
    return response;
  } catch (error) {}
};

export const getBillTransaction = async () => {
  try {
    const response = await API.get(`/api/v1/bill/product/payed`);
    return response;
  } catch (error) {}
};
