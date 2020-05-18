import React from "react";
import { Switch, Route } from "react-router-dom";

import MainIndexPage from "./MainIndexPage";
import AllCurrenciesPage from "./AllCurrenciesPage";
import CurrencyPage from "./CurrencyPage";
import CurrencyFromToPage from "./CurrencyFromToPage";
import CurrencyDatePage from "./CurrencyDatePage";

export const useRoutes = (data) => {
  return (
    <div className="content">
      <Switch>
        <Route path="/:country_code/currency/:currency_code/:currency_code_to/:year-:month-:day">
          <CurrencyDatePage data={data} />
        </Route>
        <Route path="/:country_code/currency/:currency_code/:currency_code_to/">
          <CurrencyFromToPage data={data} />
        </Route>
        <Route path="/:country_code/currency/:currency_code">
          <CurrencyPage data={data} />
        </Route>
        <Route path="/:country_code/currency">
          <AllCurrenciesPage data={data} />
        </Route>
        <Route path="/:country_code">
          <MainIndexPage data={data} />
        </Route>
        <Route path="/">
          <MainIndexPage data={data} />
        </Route>
      </Switch>
    </div>
  );
};
