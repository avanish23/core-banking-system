import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register(props){

    const [user,setUser]=useState({
        fname:"",
        mname:"",
        lname:"",
        aadhar:0,
        phone:0,
        address:"",
        password:"",
        cpassword:""
    })
    function handleSubmit(event){
        event.preventDefault();
        if(user.password!==user.cpassword){
            alert("Passwords don't match!");
            }
        else
        {axios.post("http://localhost:5000/auth/register", user).then(
            result=>{

            
            if (result.data.msg === "User already exists!") {
                    alert(result.data.msg);
            }else if(result.data.jwtToken){
                const parseRes = result.data.jwtToken;
                localStorage.setItem("jwt_token", parseRes);
                
                window.location.href = '/account';
            }else{
                alert("Something went wrong!");
            }
            }).catch((err) => console.log(err.message));}
        
    }

    function handleChange(event){
        const { name, value } = event.target;
        setUser(prevValue => {
            return {
                ...prevValue,
                [name]: value

            }
        })
    }




    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input name = "fname" onChange={handleChange} placeholder="First Name" value={user.fname}/>
                <input name="mname" onChange={handleChange} placeholder="Middle Name" value={user.mname}/>
                <input name="lname" onChange={handleChange} placeholder="Last Name"value={user.lname} />
                <input type="number" onChange={handleChange} name="aadhar" placeholder="Aadhar Number" value={user.aadhar} />
                <input type="number" onChange={handleChange} name="phone" placeholder="Contact Number" value={user.phone} />
                <input name="address" onChange={handleChange} placeholder="Address" value={user.address} />
                <input type="password" onChange={handleChange} name="password" placeholder="Password" value={user.password} />
                <input type="password" onChange={handleChange} name="cpassword" placeholder="Confirm Password" value={user.cpassword} />
                <button type="submit" placeholder="Submit">Submit</button>

            </form>
            <Link to="/login">Already a user? Login</Link>

            
        </div>
    )
}