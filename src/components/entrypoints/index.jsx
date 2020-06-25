import React from "react";
import { hydrate } from "react-dom";
import App from "../../pages/App";
import { BrowserRouter } from "react-router-dom";

import { createStore, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "../../store";

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App data={window.STATE} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
