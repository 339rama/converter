import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { AuthContext } from "../../context/AuthContext";
import { useRoutes } from "./routes";

const AdminApp = ({data}) => {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated, data);

    return (
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated }}
      >
        {routes}
      </AuthContext.Provider>
    );
}

export default AdminApp;