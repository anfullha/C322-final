
import * as React from "react";
import Axios from 'axios';
import { useState, useEffect, useContext } from "react";
//import { useLocation } from "react-router-dom";
import { AuthContext } from "../App";

const ViewTrips = () => {
    const [data, setData] = useState([]);
    //const location = useLocation();
    
    const authContext = useContext(AuthContext);
    const userID = authContext.userID;
    const [username, setUsername] = useState([]);
    const [totalDistance, setTotalDistance] = useState(0);
    


    const getInfo = () => {
        Axios.get(`https://c322-travel-reimbursement.herokuapp.com/api/get/trips/UserID/${userID}`)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            const distances = response.data.map((trip) => trip.Distance);
            const total = distances.reduce((accumulator, currentValue) => accumulator + currentValue);
            setTotalDistance(total);
        })

        Axios.get(`https://c322-travel-reimbursement.herokuapp.com/api/get/username/${userID}`)
        .then((response) => {
            setUsername(response.data);
            console.log(response.data);
        })
    }

    useEffect(() =>{
        getInfo();
    }, []);
    
    return (
        <div
        style={{
          color: "white",
          backgroundColor: "black",
          marginLeft: "20%",
          marginTop: "50px",
          width: "800px",
          height: "auto",
          borderRadius: "15px",
          paddingBottom: "50px",
          border:'5px solid #707070'
        }}
      >
        <div style={{paddingLeft: '5%', paddingTop: '20px'}}>
          <table>
            <thead>
              <tr>
                <th style={{paddingLeft: '0px', color:'green', textDecoration:'underline'}}>Trip ID</th>
                <th style={{paddingLeft: '60px', color:'green', textDecoration:'underline'}}>Username</th>
                <th style={{paddingLeft: '60px', color:'green', textDecoration:'underline'}}>Distance (Kilometers)</th>
                <th style={{paddingLeft: '60px', color:'green', textDecoration:'underline'}}>Gas Refund Amount ($USD)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td style={{paddingLeft: '0px'}}>{val.TripID}</td>
                    <td style={{paddingLeft: '60px'}}>{username[0]?.Username?.slice(0, 20)}</td>
                    <td style={{paddingLeft: '60px'}}>{val.Distance.toFixed(1)} km</td>
                    <td style={{paddingLeft: '60px'}}>${(val.Distance * 0.621371 / 25.4 * 3.66).toFixed(2)}</td>
                  </tr>
                );
              })}
              
            </tbody>
            
          </table>
          <tr style={{display: 'inline', justifyContent: 'center', alignItems: 'center'}}>
            <td style={{whiteSpace: "nowrap", fontWeight: "bold", paddingTop:'40px', paddingLeft:'90px'}}>Total Distance:</td>
            <td style={{fontWeight: "bold", color:"red", paddingTop:'40px', paddingLeft:'10px'}}>{totalDistance.toFixed(1)} km</td>
            <td  style={{ whiteSpace: "nowrap",fontWeight: "bold", paddingLeft:'50px'}}>Total Reimbursement:</td>
            <td style={{fontWeight: "bold", color:"green", paddingLeft:'10px'}}>${(totalDistance * 0.621371 / 25.4 * 3.66).toFixed(2)}</td>
            <td></td>
        </tr>
        </div>
        </div>
      );
      
}
export default ViewTrips;
