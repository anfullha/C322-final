import * as React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios';



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authContext = useContext(AuthContext);
  const [userID, setUserID] = useState([]);//authContext.UserID;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    Axios.post("https://c322-travel-reimbursement.herokuapp.com/api/login/user", {
      username: username,
      password: password
    }).then((response) => {
        if (response.data && response.data.length > 0) {
            const userID = response.data[0].UserID;
            setUserID(userID);
            authContext.setIsLoggedIn(true);
            
            
            authContext.handleLogin(userID);
               
            // Navigate to ViewTrips page with userID as state
            navigate('/viewTrips', { state: { userID: userID } });
          } else {
            authContext.setIsLoggedIn(false);
            setErrorMessage("Invalid username or password");
          }
    });
  }

  


  

  if (authContext.isLoggedIn) {
    // Navigate to ViewTrips page with userID as state
    return <Navigate to={{pathname: '/viewTrips', state: { userID: userID }}} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          marginLeft: "30%",
          marginTop: "50px",
          width: "500px",
          border:'5px solid #707070',
          
          borderRadius: "15px",
          paddingBottom:'50px'
        }}
      >
        <div style={{ marginLeft: "50px", paddingTop: "20px" }}>
          <div
            style={{
              marginLeft: "35%",
              fontSize: "25px",
              textDecoration: "underline",
            }}
          >
            Login
          </div>
          {errorMessage && <p style={{color: "red", marginLeft: "20%", marginTop: "25px"}}>{errorMessage}</p>}
          <div style={{ marginTop: "50px" }}>
            Username
            <input
              style={{ marginLeft: "75px", width: "250px" }}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div style={{ marginTop: "50px" }}>
            Password
            <input
              style={{ marginLeft: "80px", width: "250px" }}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ marginLeft: "350px", marginTop: "25px" }}
            type="submit"
          >
            Login
          </button>
          
        </div>
      </div>
    </form>
  );
};

export default Login;
