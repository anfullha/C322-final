import { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Call the logout function from the authentication context
    authContext.handleLogout();
  }, [authContext]);

  // Redirect to the login page after logout
  return <Navigate to="/login" />;
};

export default Logout;