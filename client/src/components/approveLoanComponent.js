import React,{useState,useEffect} from "react";
import axios from "axios";
import ApproveLoanElement from "./approveLoanElelment";

export default function ApproveLoan(props){


    let config = {
        headers: {
            jwt_token: localStorage.jwt_token
        }
    }

    useEffect(() => {
        names();
    }, []);

    function names() {
        axios.get("http://localhost:5000/dashboard/", config).then(result => {
            if (result.data.msg === "Token Invalid" || result.data.msg === "Not Authorized") {

                window.location.href = "login";
            }
        }).catch((err) => console.log(err.message));
    };

    const [approve,setApprove]=useState([]);



    axios.get("http://localhost:5000/loans/approveLoan",config).then(
    result=>{
        setApprove(result.data);
        
    }


    ).catch((err)=>console.log(err.message));



    return(
        <div>
                {   
                    approve.map(a => {
                        return (<ApproveLoanElement loan={a.loan_number} amount={a.amount} accnum={a.account_number} interest={a.interest} time={a.tenure}/>)
                    })
                }
        </div>
    )
}