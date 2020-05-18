import React from "react";
import { hydrate } from "react-dom";
import App from "../../pages/App";
import { BrowserRouter } from "react-router-dom";

hydrate(
  <BrowserRouter>
    <App data={window.STATE} />
  </BrowserRouter>,
  document.getElementById("root")
);
