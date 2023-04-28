
import * as React from "react";
import { useState } from "react";
import Axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    
    const handleRegister = (e) => {
        console.log(username + " " + password);
        e.preventDefault();
        if(!username){
            setError("Please enter a username.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
          }
        
       
        if (password !== retypePassword) {
          setError("Passwords do not match.");
          return;
        }
        
        Axios.post("https://c322-travel-reimbursement.herokuapp.com/api/get/userID", {
            username: username
        }).then((response) => { 
            if (response.data && response.data.length > 0) {
                setError("Username already exists.");
            } else {
                    if (password.length < 6) {
                        setError("Password must be at least 6 characters long.");
                    } else {
                        Axios.post("https://c322-travel-reimbursement.herokuapp.com/api/insert/user", {
                            username: username,
                            password: password
                        }).then(() => {
                            navigate('../login');
                        });
                    }
            }
        });
    };


    return(
        <form>
        <div style={{color:'white', backgroundColor:'black', marginLeft:'30%', marginTop:'50px', width:'500px', height:'auto', paddingBottom:'50px', borderRadius:'15px', border:'5px solid #707070'}}>
            <div style={{paddingTop:'20px', marginLeft:'40%', fontSize:'25px', textDecoration:'underline'}}>
                Register
            </div>
            {error && (
                <div
                    style={{
                        color: "red",
                        width: "500px",
                        height: "70px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <p>{error}</p>
                </div>
            )}
            <div style={{marginLeft:'35px', paddingTop:'10px'}}>
                <div style={{marginTop:'10px'}}>
                    Username
                    <input style={{marginLeft:'100px', width:'250px'}}
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} >
                    </input>
                </div>
                <div style={{marginTop:'50px'}}>
                    Password
                    <input style={{marginLeft:'105px', width:'250px'}} 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div style={{marginTop:'50px'}}>
                    Re-Type Password
                    <input style={{marginLeft:'45px', width:'250px'}}
                        type="password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}>
                    </input>
                </div>
                <button className="btn btn-primary"  style={{marginLeft:'330px', marginTop:'30px'}} onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    </form>
    );
}
export default Register;