const userModel =require('../model/user.model');

 module.exports.upload= async(req, res)=>{

    try{
        const path = req.file.path
        userModel.findByIdAndUpdate(
            req.body.idUser,
            { $set: { picture: path} },
            {new: true, upsert:true, setDefaultsOnInsert:true},
            (err,docs)=>{
                if(!err){
                    res.status(201).send(docs)
                }else{
                    res.status(201).send(err)
                }
            }
        )
    }catch(err){
        res.status(201).send(err)
    }
  
     
}