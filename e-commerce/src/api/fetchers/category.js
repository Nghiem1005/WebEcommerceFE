import { API } from '../baseUrl'

export const getAllCategories = async() => {
    try {
        const response = await API.get('/api/v1/category')
        return response
    } catch (error) {
        
    }
}
