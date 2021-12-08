import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Transaction(props) {

    const [debit,setDebit] = useState([]);

    const [transaction, setTransaction] = useState({
        saccount: "",
        amount: 0,
        raccount: "",
        password: ""
    })

    let config = {
        headers: {
            jwt_token: localStorage.jwt_token
        }
    }

    useEffect(() => {
        names();
    }, []);

    useEffect(() => {
        if(debit.length!==0)
            alert("Money Transferred Successfully \n "+"Transaction ID: " + debit[0].transaction_id);

    }, [debit]);

    function names() {
        axios.get("http://localhost:5000/dashboard/", config).then(result => {
            if (result.data.msg === "Token Invalid" || result.data.msg === "Not Authorized") {

                window.location.href = "login";
            }
        }).catch((err) => console.log(err.message));
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setTransaction(prevValue => {

            return {
                ...prevValue,
                [name]: value
            }

        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/transaction/sendMoney", transaction, config).then(
            result => {
                if (result.data.msg === "Password Incorrect!" || result.data.msg === "Account does not exist" || result.data.msg === "Insufficient Balance" || result.data.msg==="Can't send 0 rupees") {
                    alert(result.data.msg);
                    
                }
                
                else {
                    setDebit(result.data);
                    window.location.href="/balance";
                }
            }
        ).catch((err) => console.log(err.message));
    }





    return (
        <div>
            <h1>Transaction</h1>
            <form onSubmit={handleSubmit}>
                <input name="saccount" onChange={handleChange} placeholder="Your Account Number"  value={transaction.saccount} />
                <input type="number" name="amount" placeholder="Amount" onChange={handleChange} value={transaction.amount} />
                <input name="raccount" placeholder="Payee Account Number" onChange={handleChange} value={transaction.raccount} />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={transaction.password} />
                <button type="submit" placeholder="Send Money">Send Money</button>
            </form>
        </div>
    )
}