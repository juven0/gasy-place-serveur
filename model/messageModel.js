const db = require('../db/dbConnector');

module.exports.creatMessage = async (data)=>{
    const idSend = data.idSend;
    const idReceve = data.idReceve;
    const content = data.content;
    const dateTime = data.dateTime;
    const state = data.state;
    const sql = `INSERT INTO message (idSend, idReceve, content, dataTime, state)VALUES (${idSend},${idReceve},'${content}','${dateTime}','${state}')`;

    db.query(sql, (err, res, field)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });
};

module.exports.listMessage = (data)=>{
    const idSend = data.idSend;
    const idReceve = data.idReceve;
    const sql = `SELECT idMessage,content,dataTime ,state FROM message WHERE idSend=${idSend} AND idReceve=${idReceve} ORDER BY dataTime`;

    let result=[];
    db.query(sql, (err, res, field)=>{
        if (err) {
            return err;
        } else {
            result.push(res) ;
        }
    });
    return result; 
};

module.exports.update = async(data)=>{
    const idMessage = data.id;
    const value = 1
    const sql = `UPDATE message SET state=${value} WHERE idMessage=${idMessage}`;

    db.query(sql, (err, res, field)=>{
        if(err){
            console.log(err)
        }else{
            console.log(res);
        }
    });
};

module.exports.deleteMessage = async (data)=>{
    const idMessage = data.idMessage;
    const sql = `DELETE FROM message WHERE idMessage=${idMessage}`;

    db.query(sql, (err, res, field) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
};