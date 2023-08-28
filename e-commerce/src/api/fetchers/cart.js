import axios from "axios";
import { API } from "../baseUrl";

export const getCartByUser = async () => {
  try {
    const response = await API.get(`/api/v1/cart/product`);
    return response;
  } catch (error) {}
};

export const addCartByUser = async ({ productId, amount }) => {
  try {
    const response = await API.post(
      `/api/v1/cart/product?productId=${productId}&amount=${amount}`
    );
    return response;
  } catch (error) {}
};

export const deleteCartByUser = async (productId) => {
  try {
    const response = await API.delete(
      `/api/v1/cart/product?productId=${productId}`
    );
    return response;
  } catch (error) {}
};

export const getDetailCartByUser = async () => {
  try {
    const response = await API.get(`/api/v1/cart/product`);
    if (response.data) {
      const promises = response.data.map((product) =>
        API.get(`/api/v1/product/${product.productId}`)
      );
      const result = await axios.all(promises);

      const data = result.reduce(
        (acc, value, index) => [
          ...acc,
          {
            cartId: response.data[index].cartId,
            amount: response.data[index].amount,
            product: { ...value.data },
          },
        ],[]);
        return data;
    }
  } catch (error) {}
};
