const conversation = require('../model/converssation.Model')

module.exports.create = async (req, res)=>{
    const {user1 , user2} = req.body
    try {
        const newConve = await conversation.create({ membres:[user1, user2] });
        return res.status(201).json(newConve)
    } catch {
        return res.status(500).json({ error: "can not recreate " });
    }
}
module.exports.find = async (req, res)=>{
 
    await conversation.find({ membres :{ $in:[req.params.id]} }, (err, docs) => {
        if (!err) {
            return res.status(200).json(docs);
        } else {
            return res.status(500).json({ "error": err })
        }
    });
}
