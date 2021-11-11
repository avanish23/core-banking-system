const Pool = require("pg").Pool;
const pool = new Pool(
{
    host:"localhost",
    user:"postgres",
    password:"avanish",
    port: 5432,
    database: "cbs"
});

module.exports=pool;