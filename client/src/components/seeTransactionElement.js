import React from "react";
import axios from "axios";


export default function SeeTransactionElement(props){





    return(
        <div>
            <p> {props.transid} {props.raccount} {props.amount} {props.ttype} </p>
        </div>
    )
}