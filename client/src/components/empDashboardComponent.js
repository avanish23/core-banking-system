import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EmployeeDashboard(props){
    const [name,setName] = useState("")

    let config = {
        headers: {
          jwt_token: localStorage.jwt_token
        }
      }

    async function names(){
        axios.get("http://localhost:5000/dashboard/emp",config).then(result=>{
            if(result.data.msg==="Token Invalid" || result.data.msg==="Not Authorized"||result.data.msg==="Access denied"){
                window.location.href="login";
            }
            else
            {
              console.log(result.data);
              setName(
              "Hello "+result.data.first_name+" "+result.data.middle_name+" "+result.data.last_name
            )}
       }).catch((err) => console.log(err.message));
    };

    function onLogout(){
        localStorage.removeItem("jwt_token");
        window.location.href="/login";
    }

    useEffect(() => {
        names();
      }, []);

   return(
        <div>
            <h1> {name} </h1>
            
            <button><Link to="/approve">Approve</Link></button>
            
            

            <button onClick={onLogout} placeholder="Logout">Logout</button>
        </div>
    )
   }
