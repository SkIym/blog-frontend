import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = async (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, blogObject, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

const update = async (blogObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogObject, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

const comment = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, content, config)
    return response.data
  } catch (err) {
    return Promise.reject(err.response.data.error)
  }
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
  comment,
};
