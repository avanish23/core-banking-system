import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard(props){
    const [name,setName] = useState("")

    let config = {
        headers: {
          jwt_token: localStorage.jwt_token
        }
      }

    async function names(){
        axios.get("http://localhost:5000/dashboard/",config).then(result=>{
            if(result.data.msg==="Token Invalid" || result.data.msg==="Not Authorized"){
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
            <button><Link to="/account">Open an account</Link></button>
            <button><Link to="/balance">Check Balance</Link></button>
            <button><Link to="/transaction">Send Money</Link></button>
            <button><Link to="/seeTransaction">See Transactions</Link></button>
            <button><Link to="/loans">Loans</Link></button>
            

            <button onClick={onLogout} placeholder="Logout">Logout</button>
        </div>
    )

    // else if(req.role==="Employee"){
    //   return(
    //     <div>
    //       <h1> {name} </h1>
    //       <button><Link to="/approve">Approve</Link></button>
    //       <button onClick={onLogout} placeholder="Logout">Logout</button>
    //     </div>
    //   )
    // }
}