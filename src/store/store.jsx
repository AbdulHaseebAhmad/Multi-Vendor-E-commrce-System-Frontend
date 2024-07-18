import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userSlice'; // Adjust the path as necessary
import cartReducer from "./CartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
