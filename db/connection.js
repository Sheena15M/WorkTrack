//Some of the packages needed
const util = require ("util");
const mysql = require ("mysql");

//Connect to MySQL, don't forget to do a JAWS connection since this goes to Heroku
const connection = mysql.createConnection ({
    host: "localhost",
})