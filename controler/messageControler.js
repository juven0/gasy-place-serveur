
const message = require('../model/message.Model')

module.exports.creatMessage = async(req, res)=>{
    const { converastionId,content, posterId, receverId} = req.body;

    try{
        const mess = await message.create({converastionId, content, posterId, receverId});
        return res.status(201).json(mess)
    }catch{
        return res.status(200).json({error:"can't send messsage"});
    }
};

module.exports.listMessage = async (req, res)=>{
    //{ converastionId: req.params.id }
    await message.find((err,docs)=>{
       if (!err) {
           return res.status(200).json(docs);
       } else {
           return res.status(500).json({ "error": err })
       }
    })
};

module.exports.deleteMessage = async (req, res)=>{
    const data = req.query;
    message.deleteMessage(data);
};

module.exports.update = async (req, res)=>{
    const data = req.query;
    message.update(data);
};