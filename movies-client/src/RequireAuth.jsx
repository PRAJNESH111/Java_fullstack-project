import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem("auth"); // simple check
  return isLoggedIn ? children : <Navigate to="/Login" replace />;
}

export default RequireAuth;
