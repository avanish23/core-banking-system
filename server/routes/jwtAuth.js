const express = require("express")
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");



router.post("/register", async (req, res) => {
    const { fname, mname, lname, aadhar, phone, address, password } = req.body;
    try {

        const user = await pool.query("SELECT * FROM customer WHERE aadhar_number=$1", [
            aadhar
        ]);
        if (user.rows.length > 0) {
            return res.status(200).json({msg:"User already exists!"});
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO customer(first_name,middle_name,last_name,aadhar_number,phone_number,cust_address,cust_password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [fname, mname, lname, aadhar, phone, address, bcryptPassword]);
        

        const jwtToken = jwtGenerator(newUser.rows[0].customer_id,"Customer");
        res.json({jwtToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.post("/login", async(req,res) => {
    try{
            const {aadhar,password} = req.body;
            
            const user = await pool.query("SELECT * from customer where aadhar_number=$1",[aadhar]);
            
 
            
            
            if(user.rows.length===0){
                return res.status(200).json({msg:"User does not exist"});


            }
            const validPassword = await bcrypt.compare(password,user.rows[0].cust_password);

            //console.log(validPassword);
            if(!validPassword){
                return res.status(200).json({msg:"Password Incorrect!"});
            }
            
            const jwtToken = jwtGenerator(user.rows[0].customer_id,"Customer");
            
            res.json({jwtToken});
            //res.status(200).json(validPassword);

    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});


router.post("/emplogin", async(req,res) => {
    try{
            const {empid,password} = req.body;
            
            const employee = await pool.query("SELECT * from employees where employee_id=$1",[empid]);
            
 
            
            
            if(employee.rows.length===0){
                return res.status(200).json({msg:"User does not exist"});


            }
            const validPassword = await bcrypt.compare(password,employee.rows[0].password);

            //console.log(validPassword);
            if(!validPassword){
                return res.status(200).json({msg:"Password Incorrect!"});
            }
            
            const jwtToken = jwtGenerator(employee.rows[0].employee_id,"Employee");
            
            res.json({jwtToken});
            //res.status(200).json(validPassword);

    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});





module.exports = router;