import React, { useState,useEffect } from "react";
import axios from "axios";

export default function Account(props) {

    const [account, setAccount] = useState({
        type: "",
        ifsc: ""
    })
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

    function handleSubmit(event) {
        event.preventDefault();
        // confirm("Creating a "+{account.atype});
        alert("Please confirm bank account opening");
        axios.post("http://localhost:5000/accounts/createAccount", account, config).then(
            result => {
                if (result.data.msg === "Token Invalid" || result.data.msg === "Not Authorized") {
                    window.location.href = "login";
                }else if(result.data.msg === "Congratulation! Your account has been opened"){
                    alert("Congratulations! Your account has been opened");
                    window.location.href="dashboard";
                }

            }
        ).catch((err) => console.log(err.message));
    }



    function handleChange(event) {
        const { name, value } = event.target;
        setAccount(prevValue => {
            return {
                ...prevValue,
                [name]: value

            }
        })
        
    }



    return (
        <div>
            <h2>Open an account with just 2 clicks</h2>

            <form onSubmit={handleSubmit}>
                <p> Choose Account Type</p>
                <input onClick={handleChange} type="radio" name="type" value="Savings" /> Savings Account
                <input onClick={handleChange} type="radio" name="type" value="Current" /> Current Account
                <p> Choose A Branch To Open Your Account</p>
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0003850" /> AKSHYANAGARBANGALORE
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0003047" />  BOMMANAHALLI BANGALORE
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0006781" /> BANGALORE BWSSB BRANCH
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0000031" /> CC PR SECTION HO BANGALORE
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0002890" /> BGS HEALTH AND KNOWLED BR
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0000423" /> BYATARAYANAPURA BANGALORE
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0000003" /> COMPLIANCE DEPARTMENT HO BANGALORE
                <br />
                <input onClick={handleChange} type="radio" name="ifsc" value="CNRB0000406" /> CHICKPET BANGALORE
                <br />
                <button type="submit" placeholder="Submit">Submit to Open Your Account</button>
            </form>

        </div>
    )
}