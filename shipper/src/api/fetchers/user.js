import { API } from "../baseUrl";

export const login = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);
    return response;
  } catch (error) {
  }
};


export const getUSer = async (userId) => {
  try {
    const response = await API.get(`/api/v1/user/${userId}`);
    if(response.data) {
      const response1 = await API.get(`/api/v1/address/user?userId=${response.data.id}`)
      return {
        user: response.data,
        address: response1.data[0]
      };
    }
  } catch (error) {
  }
};

export const updateUSer = async (userId, updateUser) => {
  try {
    const response = await API.put(`/api/v1/user/${userId}`, updateUser);
    return response;
  } catch (error) {}
};