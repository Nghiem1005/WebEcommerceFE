import { API } from "../baseUrl";

export const getDiscountbyProduct = async (productId) => {
    try {
        const response =await API.get(`/api/v1/discount/product/${productId}}`)
        return response
    } catch (error) {
        
    }
}