import { API } from "../baseUrl";

export const getAllProducts = async ({size, page}) => {
    try {
        const response = await API.get(`/api/v1/product?size=${size}&page=${page}`);
        return response;
    } catch (error) {
        
    }
}

export const getProduct = async(id) => {
    try {
        const response = await API.get(`/api/v1/product/${id}`);
        const responseAttribute = await API.get(`/api/v1/attribute/product?productId=${response.data.id}`);
        return {
            product: response.data,
            attribute: responseAttribute.data
        };
    } catch (error) {
        
    }
}

export const getProductCart = async (id) => {
    try {
        const response = await API.get(`/api/v1/product/${id}`);
        return response.data;
    } catch (error) {
        
    }
}

export const getProductByCate = async({size, page, categoryId}) => {
    try {
        const response = await API.get(`/api/v1/product/category/${categoryId}?size=${size}&page=${page}`);
        return response;
    } catch (error) {
        
    }
}

export const getProductByBrand = async({size, page, brandId}) => {
    try {
        const response = await API.get(`/api/v1/product/brand/${brandId}?size=${size}&page=${page}`);
        return response;
    } catch (error) {
        
    }
}

export const getFeedbackByProduct = async ({productId, page = 1, size = 1000}) => {
    try {
        const response = await API.get(`/api/v1/feedback/product?productId=${productId}&size=${size}&page=${page}`);
        return response;
    } catch (error) {
        
    }
}

export const addFeedbackByProduct = async (formData) => {
    try {
        const response = await API.post(`/api/v1/feedback`,formData);
        return response;
    } catch (error) {
        
    }
}

export const getProductSearch = async ({search, page, size}) => {
    try {
        const response = await API.get(`/api/v1/product/search?search=name:${search}&size=${size}&page=${page}`)
        return response
    } catch (error) {
        
    }
}

export const getProductByDiscount = async () => {
    try {
        const response = await API.get('/api/v1/product/discount')
        return response
    } catch (error) {
        
    }
}