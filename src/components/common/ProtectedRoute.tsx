import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getIsAuthenticated } from "../../store/auth/selectors";

const ProtectedRoute = ({ component, ...rest }: any) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/auth/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default ProtectedRoute;
