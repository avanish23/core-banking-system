const express = require("express");
const pool = require("../database");
const router = express.Router();
const authorization = require("../middleware/authorization");

router.post("/createAccount", authorization,async (req,res) =>{
    const {type,ifsc}=req.body;
try {
    const account = await pool.query("INSERT INTO accounts(balance,account_type,ifsc,customer_id) VALUES($1,$2,$3,$4) RETURNING *",[1000,type,ifsc,req.user]);
    return res.json({msg:"Congratulation! Your account has been opened"});
} catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
}
});


router.get("/checkBalance",authorization,async (req,res) => {
    try {
        const balance =await pool.query("SELECT account_number,balance from accounts where customer_id=$1",[req.user]);
        if(balance.rows.length === 0){
            return res.send("Sorry! You do not have any account with us");
        }

        res.json(balance.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports=router;