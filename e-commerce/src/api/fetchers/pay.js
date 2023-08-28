import { API } from "../baseUrl";

export const pay = async (formData) => {
  try {
    const response = await API.post("/momo", formData);
    return response;
  } catch (error) {}
};

