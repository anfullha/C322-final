import * as React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const EnterTrip = () => {
  const authContext = useContext(AuthContext);
  const { userID } = authContext;
  const [showDistanceKilometers, setShowDistanceKilometers] = useState(false);
  const [showDistanceMiles, setShowDistanceMiles] = useState(false);

  const [dKm, setDKm] = useState("");
  const [dm, setDm] = useState("");
  const navigate = useNavigate();
 

  const handleButtonClick = (button) => {
    console.log("ETUID: "+ userID);
    switch (button) {
      case "distanceMiles":
        setShowDistanceMiles(true);
        setShowDistanceKilometers(false);
        
        break;
      case "distanceKilometers":
        setShowDistanceKilometers(true);
        setShowDistanceMiles(false);
        
        break;
      
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(showDistanceKilometers == true){
        Axios.post("c322-travel-reimbursement.herokuapp.com/api/insert/trip", {
            userID: userID,
            distance: dKm
        })
    }
    else if(showDistanceMiles == true){
        Axios.post("c322-travel-reimbursement.herokuapp.com/api/insert/trip", {
            userID: userID, 
            distance: dm * 1.60934
        })
    }
    navigate('../viewTrips');


}
  

    return (
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          width: "800px",
          height: "auto",
          marginLeft: '20%',
          marginTop: "50px",
          borderRadius:'15px',
          border:'5px solid #707070',
          paddingBottom:'40px'
        }}
      >
        <div style={{paddingTop:'20px', marginLeft: "35%", fontSize: "25px", textDecoration:'underline' }}>
          New Trip Information
        </div>
      
        {showDistanceMiles && (
          <div style={{marginLeft:'250px', marginTop:'50px'}}>
            Distance (Miles): 
            <input style={{marginLeft:'5px'}}
              type="text"
              name="distanceMiles"
              value={dm}
            onChange={(event) => setDm(event.target.value)}
            />
          </div>
        )}

        {showDistanceKilometers && (
          <div style={{marginLeft:'230px', marginTop:'50px'}}>
            Distance (Kilometers): 
            <input style={{marginLeft:'5px'}}
              type="text"
              name="distanceKilometers"
              value={dKm}
            onChange={(event) => setDKm(event.target.value)}
            />
          </div>
        )}

        

   
        <div style={{marginTop:'50px'}}>
                
        </div>
        <input style={{marginLeft:'240px'}}
          type="button"
          class="btn btn-secondary"
          value="Distance (Miles)"
          onClick={() => handleButtonClick("distanceMiles")}
        />
        <input style={{marginLeft:'10px'}}
          type="button"
          class="btn btn-secondary"
          value="Distance (Kilometers)"
          onClick={() => handleButtonClick("distanceKilometers")}
        />
      
        <div style={{marginTop:'50px', marginLeft:'575px'}}>
        <button class="btn btn-primary" onClick={handleSubmit}>
            Submit Trip Information
        </button>
        </div>
        </div>
        );
    }
 export default EnterTrip;
