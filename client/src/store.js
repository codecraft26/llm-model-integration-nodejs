// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer'; // Make sure this path is correct
import { chatReducer } from './reducers/chatReducer'; // Make sure this path is correct

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

// Create the Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
