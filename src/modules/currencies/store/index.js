import { combineReducers } from "redux";
import currencyMainStoreReducer from "./main";

const currencyStore = combineReducers({
  index: currencyMainStoreReducer,
})

export default currencyStore;