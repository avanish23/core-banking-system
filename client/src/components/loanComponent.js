import React,{useState,useEffect} from "react";
import axios from "axios"

export default function Loan(props){



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





    const [loanapp,setLoanapp]=useState({ 
        lamount:0, 
        interest:0, 
        tenure:0, 
        ltype:"", 
        accnum:"", 
        password:"" })


        function handleChange(event){
            const { name, value } = event.target;
            setLoanapp(prevValue => {
                return {
                    ...prevValue,
                    [name]: value
    
                }
            })
        }

        function handleSubmit(event){
            event.preventDefault();
            axios.post("http://localhost:5000/loans/applyLoan",loanapp,config).then(
                result=>{
                    alert(result.data.msg);
                }



            ).catch((err)=>console.log(err.message));
        }




        return(
            <div>
                <h1>Loan Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="number" placeholder="Amount" name="lamount" value={loanapp.lamount} onChange={handleChange} />
                    <input type="number" placeholder="Interest" name="interest" value={loanapp.interest} onChange={handleChange} />
                    <input type="number" placeholder="Tenure" name="tenure" value={loanapp.tenure} onChange={handleChange} />
                    <input placeholder="Loan type" name="ltype" value={loanapp.ltype} onChange={handleChange} />
                    <input placeholder="Account Number" name="accnum" value={loanapp.accnum} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={loanapp.password} onChange={handleChange} />
                    <button type="submit" placeholder="Apply">Apply</button>
                </form>
            </div>
        )
}