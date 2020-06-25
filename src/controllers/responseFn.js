import React from "react";
import App from "../pages/App";
import AdminApp from "../pages/AdminPages/AdminApp";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import template from "../client/template";
import adminTemplate from "../client/adminTemplate";
import store from "../store";

const preloadedState = store.getState();

function responseFn(url, state, response, context = {}) {
  let reactComp = state.admin
    ? renderToStaticMarkup(
        <StaticRouter location={url} context={context}>
          <AdminApp data={state} />
        </StaticRouter>
      )
    : renderToStaticMarkup(
        <Provider store={store}>
          <StaticRouter location={url} context={context}>
            <App data={state} />
          </StaticRouter>
        </Provider>
      );
  if (state.admin) {
    response.send(
      adminTemplate({
        body: reactComp,
        data: JSON.stringify(state),
      })
    );
  } else {
    response.send(
      template({
        body: reactComp,
        data: JSON.stringify(state),
        preloadedState: preloadedState,
      })
    );
  }
}

module.exports = responseFn;
