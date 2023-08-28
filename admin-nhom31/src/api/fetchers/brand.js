import { API } from "../baseUrl";

export const getAllBrands = async ({ size, page }) => {
  try {
    const response = await API.get(
      `/api/v1/brand?page=${page + 1}&size=${size}`
    );
    return response;
  } catch (error) {}
};

export const getBrand = async (brandId) => {
  try {
    const response = await API.get(`/api/v1/brand/${brandId}`);
    return response;
  } catch (error) {}
};

export const createBrand = async (dataBrand) => {
  try {
    const response = await API.post(`/api/v1/brand`, dataBrand);
    return response;
  } catch (error) {}
};

export const updateBrand = async (brandId, updateBrand) => {
  try {
    const response = await API.put(`/api/v1/brand?id=${brandId}`, updateBrand);
    return response;
  } catch (error) {}
};

export const deleteBrand = async (brandId) => {
  try {
    await API.delete(`/api/v1/brand?id=${brandId}`);
  } catch (error) {}
};
