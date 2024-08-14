import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/userContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser();
  const isAuthenticated = Boolean(user);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};
