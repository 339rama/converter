import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import currencyStore from "./modules/currencies/store";


export const reducer = combineReducers({
  currency: currencyStore ,
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;