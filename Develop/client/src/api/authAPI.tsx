import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await axios.post('/auth/login', userInfo, {
      headers: {
        'Content-Type': 'aplication/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error('Unexpected error:', error);
      throw 'An unexpected erro occurred';
    }
  }
};


export { login };
