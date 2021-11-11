const express = require("express");
const pool = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
//const { send } = require("process");

router.post("/sendMoney", authorization, async (req, res) => {
    const { raccount, amount, saccount, password } = req.body;
    try {
        const user = await pool.query("SELECT * from customer where customer_id=$1", [req.user]);
        const validPassword = await bcrypt.compare(password, user.rows[0].cust_password);
        if (!validPassword) {
            return res.status(200).json({msg:"Password Incorrect!"});
        }
        else
        {const sender = await pool.query("SELECT * from accounts where customer_id=$1 and account_number=$2", [req.user, saccount]);
        if (sender.rows.length === 0) {
            return res.status(200).send({msg:"Account does not exist"});
        }

        if (sender.rows[0].balance < amount) {
            return res.status(200).send({msg:"Insufficient Balance"});
        }

        if(amount===0){
            return res.status(200).send({msg:"Can't send 0 rupees"});
        }
        
        const tcredit = await pool.query("INSERT INTO transactions(recipient_account,amount,ttype,account_number) VALUES($1,$2,$3,$4) RETURNING *", [saccount, amount, "Credit", raccount]);
        const transid = tcredit.rows[0].transaction_id;
        const tdebit = await pool.query("INSERT INTO transactions(transaction_id,recipient_account,amount,ttype,account_number) VALUES($1,$2,$3,$4,$5) RETURNING *", [transid, raccount, amount, "Debit", saccount]);
        
        
        const debit = await pool.query("UPDATE accounts set balance=(balance-$1) where account_number=$2 ", [amount, saccount]);
        const credit = await pool.query("UPDATE accounts set balance=(balance+$1) where account_number=$2", [amount, raccount]);
        
        return res.json(tdebit.rows);}

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


router.post("/seeTransactions", authorization, async (req, res) => {
    const { accountnum } = req.body;
    try {
        const accounts = await pool.query("SELECT * FROM accounts where account_number=$1 and customer_id=$2",[accountnum,req.user]);
        if(accounts.rows.length===0){
            return res.status(200).json({msg:"Choose a correct bank account"});
        }
        const transact = await pool.query("SELECT * FROM transactions WHERE account_number=$1", [accountnum]);
        //console.log(transact.rows.length);
        res.json(transact.rows);
        } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;