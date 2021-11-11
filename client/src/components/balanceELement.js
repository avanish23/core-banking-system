import React, { useState,useEffect } from "react";
import axios from "axios";

export default function BalanceElement(props){





    return(
        <div>
              <p>Account Number : {props.accnum} Balance : {props.balancee} </p>  
            
        </div>
    )
}