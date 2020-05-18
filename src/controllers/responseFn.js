import React from "react";
import App from "../pages/App";
import AdminApp from '../pages/AdminPages/AdminApp';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import template from "../client/template";
import adminTemplate from "../client/adminTemplate";

function responseFn(url, state, response, context = {}) {
  let reactComp = state.admin 
    ? renderToStaticMarkup(
      <StaticRouter location={url} context={context}>
        <AdminApp data={state} />
      </StaticRouter>)
    : renderToStaticMarkup(
      <StaticRouter location={url} context={context}>
        <App data={state} />
      </StaticRouter>);
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
        data: JSON.stringify(state) 
      })
    );
  }
}

module.exports = responseFn;
