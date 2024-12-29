const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "CanteenManagement",
    password: "Subham@123",
    port: 5432,

})
pool.connect((err) => {
    if (err) {
        console.log("Error Connecting to the Database", err);
        return
    } else {
        console.log("Connected to the Database")
    }
})

module.exports = pool;