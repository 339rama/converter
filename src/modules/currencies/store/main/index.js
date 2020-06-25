import { createSlice } from "@reduxjs/toolkit";
import Currency from "../../../../models/currency";

const currencyMainStore = createSlice({
  name: 'currency/main',
  initialState:{
    currencies: [],
  },
  reducers: {
    loadCurrencies: (state, {payload}) => {
      state.currencies = payload
    },
  }
})


export const {loadCurrencies} = currencyMainStore.actions

const currencyMainStoreReducer = currencyMainStore.reducer;

export default currencyMainStoreReducer;