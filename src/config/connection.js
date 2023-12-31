const mysql = require('mysql');
require('dotenv').config({path: 'values.env'})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
});


db.connect(function (err) {
    if ( err ) throw err;
    console.log('Connected');
});


module.exports = db;