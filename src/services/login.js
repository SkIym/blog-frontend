import axios from 'axios'
const baseUrl = '/api/login'


const login = async (creds) => {
    try {
        const response = await axios.post(baseUrl, creds)
        return response.data
    } catch(error) {
        return Promise.reject(error.response.data.error)
    }
    
}


export default {
    login,
}