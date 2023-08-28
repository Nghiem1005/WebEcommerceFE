import axios from "axios";

const header = `52b60502-6564-11ed-bcba-eac62dba9bd9`;
export const a = axios.create({
  baseURL: "https://online-gateway.ghn.vn/shiip/public-api/master-data",
});

a.interceptors.request.use(
  (req) => {
    req.headers["token"] = header;
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);
export const getProvinces = async () => {
  try {
    const { data } = await a.get("/province");
    return data;
  } catch (error) {}
};

export const getDistricts = async ({ province_id }) => {
  try {
    const { data } = await a.get(`/district?province_id=${province_id}`);
    return data;
  } catch (error) {}
};

export const getWards = async ({ district_id }) => {
  try {
    const { data } = await a.get(`/ward?district_id=${district_id}`);
    return data;
  } catch (error) {}
};

export const feeDelivery = async (codeArea) => {
  try {
    const data = {
      "service_id":100039,
      "insurance_value":500000,
      "coupon": null,
      "from_district_id": '3695',
      "to_district_id": codeArea,
      "height":15,
      "length":15,
      "weight":1000,
      "width":15
  }
    const response = await a.get(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, { params: data}
    );
    return response;
  } catch (error) {}
};
