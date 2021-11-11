const express = require("express");
const pool = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");

router.post("/applyLoan", authorization, async (req, res) => {
    const { lamount, interest, tenure, ltype, accnum, password } = req.body;
    try {
        const user = await pool.query("SELECT * from customer where customer_id=$1", [req.user]);
        const validPassword = await bcrypt.compare(password, user.rows[0].cust_password);
        if (!validPassword) {
            return res.status(200).json({msg:"Password Incorrect!"});
        }
        const accounts = await pool.query("SELECT * FROM accounts where account_number=$1 and customer_id=$2", [accnum, req.user]);
        if (accounts.rows.length === 0) {
            return res.status(200).json({msg:"Please open an account with us to be able to apply for a loan"});
        }
        const outs = lamount + (lamount * interest * tenure / 100);
        const loan = await pool.query("INSERT INTO loans(amount,outstanding_amount,interest,tenure,loan_type,account_number,status) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [lamount, outs, interest, tenure, ltype, accnum, "Pending"]);
        return res.json({msg:"We have recieved your loan application! We will get back to you in 3-4 working days! Thanks!"});


    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

    router.get("/approveLoan",authorization,async (req,res)=>{
        try {
            const loans =await pool.query("SELECT * FROM loans where status=$1",['Pending']);
            
            res.json(loans.rows);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send("Server Error!");
        }
    })

    router.post("/approveLoan",authorization,async (req,res)=>{
            const {loanid,accnum,lamount}=req.body;
            try {
                const loan= await pool.query("UPDATE loans set status='Approved' where loan_number=$1",[loanid]);
                const credit = await pool.query("UPDATE ACCOUNTS set balance = balance+$3 where customer_id=$1 and account_number=$2",[req.user,accnum,lamount]);
                const tcredit = await pool.query("INSERT INTO TRANSACTIONS(recipient_account,amount,ttype,account_number) VALUES($1,$2,$3,$4) RETURNING *", [accnum, lamount, "Loan", "c94d2019-10d5-4341-926d-e8e38142e7ff"]);

                res.json({msg:"Loan approved"});
                
            } catch (err) {
                console.log(err.message);
                return res.status(500).send("Server Error!");
            }
    })

    router.post("/rejectLoan",authorization,async (req,res)=>{
        const {loanid,accnum}=req.body;
        try {
            const loan= await pool.query("UPDATE loans set status='Rejected' where loan_number=$1"[loanid]);
            
            res.json({msg:"Loan rejected"});
            
        } catch (err) {
            console.log(err.message);
            return res.status(500).send("Server Error!");
        }
})



    router.post("/repayLoan", authorization, async (req, res) => {
        const { ramount, accnum, loannum, password } = req.body;
        try {
            const user = await pool.query("SELECT * from customer where customer_id=$1", [req.user]);
            const validPassword = await bcrypt.compare(password, user.rows[0].cust_password);
            if (!validPassword) {
                return res.status(401).json("Password Incorrect!");
            }
            const accounts = await pool.query("SELECT * FROM accounts where account_number=$1 and customer_id=$2", [accnum, req.user]);
            if (accounts.rows.length === 0) {
                return res.status(401).send("Choose a correct bank account");
            }
            if(accounts.rows[0].balance<ramount){
                return res.status(401).send("Insufficient balance");
            }

            const loans=await pool.query("UPDATE LOANS set outstanding_amount=outstanding_amount-$1 where loan_number=$2",[ramount,loannum]);
            const debit = await pool.query("UPDATE ACCOUNTS set balance=balance-$1 where account_number=$2",[ramount,accnum]);
            const dtrans =await pool.query("INSERT INTO TRANSACTIONS(recipient_account,amount,ttype,account_number) VALUES($1,$2,$3,$4)",["c94d2019-10d5-4341-926d-e8e38142e7ff",ramount,"Debit",accnum]);
            res.json("Payment successful!");

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    
})

module.exports = router;