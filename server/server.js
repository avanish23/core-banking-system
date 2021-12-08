const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(require('cors')());


app.use("/auth",require("./routes/jwtAuth"));
app.use("/dashboard",require("./routes/dashboard"));
app.use("/accounts",require("./routes/bankAccounts"));
app.use("/transaction",require("./routes/transaction"));
app.use("/loans",require("./routes/loans"));

app.listen(5000, ()=>{

    console.log("Server running on port 5000");
});