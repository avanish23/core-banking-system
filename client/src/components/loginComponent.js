import React,{useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// import {browserHistory} from 'react-router'
export default function Login(props){

  const [credential, setCredential] = useState({
    aadhar: 0,
    password: "",
    
})


function handleSubmit(event){
  event.preventDefault();
  console.log(credential)
  axios.post("http://localhost:5000/auth/login", credential)
            .then(result => {
                if (result.data.msg === "Password Incorrect!" || result.data.msg === "User does not exist") {
                    alert(result.data.msg);
                } else if(result.data.jwtToken) {
                    const parseRes = result.data.jwtToken;
                    localStorage.setItem("jwt_token", parseRes);
                    
                    window.location.href = '/dashboard';
                    
                }
                else{
                    
                    alert("Something went wrong!");
                }
            }).catch((err) => console.log(err.message));
            }


function handleChange(event){
  const { name, value } = event.target;
        setCredential(prevValue => {
            return {
                ...prevValue,
                [name]: value

            }
        })
}



return(
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input type="number" onChange={handleChange} name="aadhar" placeholder="Aadhar Number" value={credential.aadhar} />
      <input type="password" onChange={handleChange} name="password" placeholder="Password" value={credential.password} />

      <button type="submit" placeholder="Submit">Submit</button>
    </form>
    <Link to="/register">New User? Register here</Link>


    

  </div>
)

}
