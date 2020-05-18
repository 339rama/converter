import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminPage from "./AdminPage";
import AdminTextsPage from "./AdminTextsPage";
import Nav from "../../components/AdminComponents/Nav";
import AdminAllTextsPage from "./AdminAllTextsPage";
import AuthPage from "./AuthPage";

export const useRoutes = (isAuthenticated, data) => {
  if (isAuthenticated) {
    return (
      <>
        <Nav />
        <div className="content">
          <Switch>
            <Route path="/admin/texts/:language_code">
              <AdminTextsPage data={data} />
            </Route>
            <Route path="/admin/texts" exact>
              <AdminAllTextsPage data={data} />
            </Route>
            <Route path="/admin" exact>
              <AdminPage data={data} />
            </Route>
          </Switch>
        </div>
      </>
    );
  }

  return (
    <Switch>
      <Route path='/auth/login' exact>
        <AuthPage/>
      </Route>
    </Switch>
  );
};
