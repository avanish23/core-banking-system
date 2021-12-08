const express = require("express");
const pool = require("../database");
const router = express.Router();
const authorization = require("../middleware/authorization");
const empauthorization = require("../middleware/empauthorization")

router.get('/',authorization,async (
    req,res) => {
            try {
                // res.json(req.user);
                //console.log(req.role);

                const user = await pool.query("SELECT first_name,middle_name,last_name from customer WHERE customer_id=$1",[req.user]);
                

                res.json(user.rows[0]);
            } catch (err) {
                console.log(err.message);
                res.status(500).json("Server Error");
            }
    }
);

router.get('/emp',empauthorization,async(
    req,res)=>{
        try {
            // res.json(req.user);
            console.log(req.role);

            const emp = await pool.query("SELECT first_name,middle_name,last_name from employees WHERE employee_id=$1",[req.user]);
            

            res.json(emp.rows[0]);
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Server Error");
        }
}
        
    
)

module.exports=router;