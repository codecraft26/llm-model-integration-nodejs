import axios from 'axios';

export const sendPrompt = (prompt) => async (dispatch) => {
  try {
    // Send the prompt in the required JSON format
    const { data } = await axios.post('http://localhost:3000/api/send-prompt', { query: prompt });
    dispatch({ type: 'SEND_PROMPT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'SEND_PROMPT_FAIL', payload: error.response ? error.response.data.message : error.message });
  }
};

export const saveChat = (chatData) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/save-chat', chatData);
    dispatch({ type: 'SAVE_CHAT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'SAVE_CHAT_FAIL', payload: error.response.data.message });
  }
};

export const getChatHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/history');
    dispatch({ type: 'GET_CHAT_HISTORY_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_CHAT_HISTORY_FAIL', payload: error.response.data.message });
  }
};

export const getSavedChatHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/savedChat');
    dispatch({ type: 'GET_SAVED_CHAT_HISTORY_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_SAVED_CHAT_HISTORY_FAIL', payload: error.response.data.message });
  }
};
