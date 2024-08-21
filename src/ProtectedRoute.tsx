import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactElement;
  isAuthenticated: boolean;
}

export const ProtectedRoute = ({
  children,
  isAuthenticated,
}: ProtectedRouteProps) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};
