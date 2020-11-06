//Some of the packages needed
const util = require ("util");
const mysql = require ("mysql");

//Connect to MySQL, don't forget to do a JAWS connection since this goes to Heroku
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Nijm8418",
        database: "employees"
    });
};

connection.connect();

//Callbacks Don't "await", they promise
connection.query = util.promisify(connection.query);

module.exports = connection;