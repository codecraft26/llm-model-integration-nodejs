const initialState = {
    chats: [],
    savedChats: [],
    loading: false,
    error: null,
  };
  
  export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_PROMPT_SUCCESS':
        return { ...state, chats: [...state.chats, action.payload], loading: false };
      case 'SEND_PROMPT_FAIL':
          return {
            ...state,
            error: action.payload,
          };
      case 'SAVE_CHAT_SUCCESS':
        return { ...state, savedChats: [...state.savedChats, action.payload], loading: false };
      case 'GET_CHAT_HISTORY_SUCCESS':
        return { ...state, chats: action.payload, loading: false };
      case 'GET_SAVED_CHAT_HISTORY_SUCCESS':
        return { ...state, savedChats: action.payload, loading: false };
      case 'SEND_PROMPT_FAIL':
      case 'SAVE_CHAT_FAIL':
      case 'GET_CHAT_HISTORY_FAIL':
      case 'GET_SAVED_CHAT_HISTORY_FAIL':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  