import { useState, createContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import EnterTrip from "./pages/enterTrip";
import Login from  "./pages/login";
import Logout from "./pages/logout";
import Register from "./pages/register";
import ViewTrips from "./pages/viewTrips";
import Navbar from "./navbar/navbar";

// Create a context to hold the user's authentication status
export const AuthContext = createContext();

function App() {
 // Initialize the user's authentication status to "false" if there is no existing value in localStorage
 const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
 const [userID, setUserID] = useState(localStorage.getItem('userID') || '');
 // Define a function to handle user login
 const handleLogin = (newUserID) => {
   setIsLoggedIn(true);
   setUserID(newUserID);
   localStorage.setItem('userID', newUserID);
   console.log("APP JS userID: " + userID);
   console.log("APP JS UserID: " + newUserID);
   localStorage.setItem('isLoggedIn', true);
   
 };
 useEffect(() => {
   console.log("userID:", userID);
 }, [userID]);


  
  // Define a function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID(null);
    localStorage.setItem('isLoggedIn', false);
  };

  // Define a private route component that requires authentication
  const PrivateRoute = ({ element: Element, ...rest }) => (
    <Route
      {...rest}
      element={
        isLoggedIn ? (
          <Element />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );

  return (
    // Provide the AuthContext with the user's authentication status and the login/logout functions
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogin, handleLogout, userID }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/enterTrip' element={<EnterTrip />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/viewTrips' element={<ViewTrips />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
