const express = require("express");
const pool = require("../database");
const router = express.Router();
const authorization = require("../middleware/authorization");

router.get('/',authorization,async (
    req,res) => {
            try {
                // res.json(req.user);
                const user = await pool.query("SELECT first_name,middle_name,last_name from customer WHERE customer_id=$1",[req.user]);
                res.json(user.rows[0]);
            } catch (err) {
                console.log(err.message);
                res.status(500).json("Server Error");
            }
    }
);

module.exports=router;