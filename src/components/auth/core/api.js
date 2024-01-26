// service.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// const service = axios.create({
//   baseURL: BASE_URL,
//   timeout: 5000, // Adjust the timeout as needed
// });

// Signup method
export const signUp = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Signin method
export const signInFetchData = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const getProfileAPI = async (_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/${_id.userId}`, {
      headers: {
        Authorization: `${_id.token}`, // Pass the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const getSaleData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sale`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// export default {service};
