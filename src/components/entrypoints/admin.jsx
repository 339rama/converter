import React from "react";
import { hydrate } from "react-dom";
import AdminApp from "../../pages/AdminPages/AdminApp";
import { BrowserRouter } from "react-router-dom";

hydrate(
  <BrowserRouter>
    <AdminApp data={window.STATE} />
  </BrowserRouter>,
  document.getElementById("root")
);
