const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return { ...state, user: action.payload, loading: false };
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
      case 'LOGOUT_FAIL':
        return { ...state, error: action.payload, loading: false };
      case 'LOGOUT_SUCCESS':
        return { ...state, user: null, loading: false };
      default:
        return state;
    }
  };
  