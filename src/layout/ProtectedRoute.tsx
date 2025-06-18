import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/auth/selectors";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthorized = useSelector(selectCurrentToken);

  if (!isAuthorized) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
