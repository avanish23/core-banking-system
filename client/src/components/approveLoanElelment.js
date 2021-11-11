import React from "react";
import axios from "axios";

export default function ApproveLoanElement(props){

    const approval={
        loanid:props.loan,
        accnum:props.accnum,
        lamount:props.amount
    }

    let config = {
        headers: {
            jwt_token: localStorage.jwt_token
        }
    }

    function handleApprove(event){
        event.preventDefault();
        axios.post("http://localhost:5000/loans/approveLoan",approval,config).then(
            result=>{
                alert(result.data.msg);
            }

        ).catch((err)=>console.log(err.message));
    }

    function handleReject(event){
        event.preventDefault();
        axios.post("http://localhost:5000/loans/rejectLoan",approval,config).then(
            result=>{
                alert(result.data.msg);
            }

        ).catch((err)=>console.log(err.message));
    }

    return(
        <div>
            <div>
            Loan ID:{props.loan} Amount:{props.amount} Interest:{props.interest} Tenure={props.time} Account Number:{props.accnum}

            </div>
            <button onClick={handleApprove} placeholder="Approve">Approve</button>
            <button onClick={handleReject} placeholder="Reject">Reject</button>
        </div>
    )
}