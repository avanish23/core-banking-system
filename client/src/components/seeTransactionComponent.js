import React, { useState,useEffect } from "react";
import axios from "axios";
import SeeTransactionElement from "./seeTransactionElement";
export default function SeeTransaction(props){

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

    const [transaction,setTransaction]=useState([]);
    const [account,setAccountnum]=useState({
        accountnum:""
    });
    const [bool,setBool]=useState(false);

     function handleChange(event){
         setAccountnum(
             {
                 accountnum:event.target.value
             }
         )
     }
     

     function handleSubmit(event){
         event.preventDefault();
         axios.post("http://localhost:5000/transaction/seeTransactions",account,config).then(
             result=>{
                 
                 if(result.data.msg==="Choose a correct bank account"){
                     alert(result.data.msg);
                 }
                 else{
                     setTransaction(result.data);
                     setBool(true);

                 }
             }
         ).catch((err)=> console.log(err.message));

         
     }





    return(
        <div>
            <div>
                <h1>See transactions</h1>
                <form onSubmit={handleSubmit}>
                    <input name="accountnum" onChange={handleChange} placeholder="Account number" value={account.accountnum} />
                    <button type="submit" placeholder="Submit">Submit</button>
                </form>
            </div>
            <div>
            {   
                    transaction.map(t => {
                        return (<SeeTransactionElement raccount={t.recipient_account} amount={t.amount} transid={t.transaction_id} ttype={t.ttype}  />)
                    })
                }

            </div>
        </div>
    )
}