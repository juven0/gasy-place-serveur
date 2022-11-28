const mysql = require('mysql');
require('dotenv').config("../.env")

const db = mysql.createConnection({
    host:     `${process.env.HOST_DB}`,
    user:     `${process.env.USER_DB}`,
    password: `${process.env.PASSWORD_DB}`,
    database: `${process.env.DATABASE}`
})

db.connect((err)=>{
    if (!err){
        console.log('database connected');
    } else{
        console.log('erreur de connection avec la base');
    }
});

module.exports = db;