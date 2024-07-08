import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = async (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: {Authorization: token},
    }

    const response = await axios.get(baseUrl, config)
    return response.data
}

const create = async (blogObject) => {
    const config = {
        headers: {Authorization: token},
    }
    try {
        const response = await axios.post(baseUrl, blogObject, config)
        return response.data
    } catch(error) {
        return Promise.reject(error.response.data.error)
    }
    
}


export default {
    getAll,
    setToken,
    create
}