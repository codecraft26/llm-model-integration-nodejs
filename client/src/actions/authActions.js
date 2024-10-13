import axios from 'axios';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/login', credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
  }
};

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/register', userInfo);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get('/api/logout');
    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message });
  }
};
