const db = require('../db/dbConnector');


module.exports.creatUser = async(data)=>{
    const nom = data.nom;
    const prenom = data.prenom;
    const email = data.email;
    const password = data.password;

    let result = [];
    const sql = `INSERT INTO user (name,prenom,user_email,user_password) VALUES ('${nom}','${prenom}','${email}','${password}')`;   

    db.query(sql, (err, res, field)=>{
        if(!err){
            result= res
        }else{
            result= 'erreur ';
        }
        return result;
    })

};

module.exports.findUser = async(data)=>{
    const value = data.value;
    
    const sql= `SELECT user_id,name,prenom FROM user WHERE user_id=${value}`;

    db.query(sql, (err, res, field)=>{
        if(err){
            console.log('erreur');
        }else{
            console.log(res)
        }
    })
};

module.exports.findAll = async (data) => {
    const value = data.value;
    const colone = data.colone;
    const sql = `SELECT user_id,name,prenom FROM user WHERE ${colone}='${value}'`;

    db.query(sql, (err, res, field) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res)
        }
    })
};

module.exports.update = async (data)=>{
    const value = data.body.value;
    const colone = data.body.colone;
    const idUser = data.query.idUser;
    const sql = `UPDATE user SET ${colone}='${value}' WHERE user_id=${idUser}`;

    db.query(sql, (err, res, field)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });
}

module.exports.delete = async (data)=>{
    const idUser = data.query.idUser;
    const sql = `DELETE FROM user WHERE user_id=${idUser}`;

    db.query(sql, (err, res, field)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res); 
        }
    })
};

