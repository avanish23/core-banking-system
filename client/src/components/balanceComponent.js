import React, { useState,useEffect } from "react";
import axios from "axios";
import BalanceElement from "./balanceELement";

export default function Balance(props){
    let config = {
        headers: {
            jwt_token: localStorage.jwt_token
        }
    }
 
    useEffect(() => {
        names();
      }, []);

    function names(){
       axios.get("http://localhost:5000/dashboard/",config).then(result=>{
             if(result.data.msg==="Token Invalid" || result.data.msg==="Not Authorized"){
                 
                 window.location.href="login"; 
             }
        }).catch((err) => console.log(err.message));
     }; 

     const [balance,setBalance]=useState([]);

     axios.get("http://localhost:5000/accounts/checkBalance",config).then(
         result=>{
             setBalance(result.data);
         }
     ).catch((err)=>console.log(err.message))






    return(
        <div>
            <h1>Balance</h1>
            <div>
            {
                    balance.map(b => {
                        return (<BalanceElement accnum={b.account_number} balancee={b.balance} />)
                    })
                }
                </div>


        </div>
    )
}