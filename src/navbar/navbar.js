
import { Nav, NavLink, Bars, NavMenu } from "./navbarElements"
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from "../App"
import Axios from 'axios';
import { useState, useEffect, useContext } from "react";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const userID = authContext.userID;
  const [username, setUsername] = useState([]);
  const getUsername = async () => {
    const response = await Axios.get(`http://localhost:3002/api/get/username/${userID}`);
    setUsername(response.data);
  };
  useEffect(() => {
    getUsername();
  }, [userID]);


  return (
    <Nav>
      <Bars />
      <NavMenu>
        <NavLink className="btn btn-secondary"style={{ zIndex: 1, whiteSpace: "nowrap", marginTop:'17px', height:'40px', marginLeft:'10px'}} to={"./home"}>
          Home
        </NavLink>
        {authContext.isLoggedIn && (
            <>
        <NavLink  className="btn btn-secondary" style={{ zIndex: 1, whiteSpace: "nowrap", marginTop:'17px', height:'40px', marginLeft:'10px'}} to={{ pathname: "./viewTrips", state: { userID: authContext.userID }}}>
          View Trips
        </NavLink>
        <NavLink  className="btn btn-secondary" style={{ zIndex: 1, whiteSpace: "nowrap", marginTop:'17px', height:'40px', marginLeft:'10px'}} to={{ pathname: "./enterTrip", state: { userID: authContext.userID }}}>
          Enter Trip
        </NavLink>
        </>)}
        <div style={{fontSize:'20px', position: "absolute", top: "30px", right: "475px", fontWeight:'bold', color:'#E8CBC0' }}>
                Travel Reimburesment Tracking App
        </div>
        {authContext.isLoggedIn && (
           <>
            <div style={{position: "absolute", top: "33px", right: "auto", color:'white', paddingLeft:'950px'}}>
                Welcome, {username[0]?.Username?.slice(0, 20)}.
            </div>
          <NavLink to={"./logout"} style={{zIndex: 1, marginLeft:'215%', color:'white', height:'40px', marginTop:'17px' }}  className="btn btn-danger">
           Logout
          </NavLink>
          </>
         
        )}
        {!authContext.isLoggedIn && (
          <>
            <NavLink className="btn btn-primary" to={"./login"} style={{ marginLeft: "380%", marginTop:'17px', height:'40px' }}>
              Login
            </NavLink>
            <NavLink className="btn btn-success" to={"./register"} style={{marginLeft:'10px', marginTop:'17px', height:'40px' }}>
              Register
            </NavLink>
          </>
        )}
      </NavMenu>
    </Nav>
  )
}

export default NavBar
