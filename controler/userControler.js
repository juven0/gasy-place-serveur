
const userModel = require('../model/user.model');
const objectId = require('mongoose').Types.ObjectId;

module.exports.findOne = async(req, res)=>{

    if(!objectId.isValid(req.params.id)){
        return res.status(400).json({"error":"user unknown"});
    }

    userModel.findById(req.params.id , (err, docs)=>{
        if(!err){
            return res.status(200).json(docs);
        }else{
            return res.status(500).json({"error": err})
        }
    }).select('-password');

};

module.exports.findAll = async (req, res)=>{
    try{
        const users = await userModel.find().select("-password");
        return res.status(200).json(users);
    }catch(err){
        return res.status(400).json({"error":"error"})
    }
};

module.exports.updateBio = async (req,res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "user unknown" });
    }
    try{
        await userModel.findByIdAndUpdate(
    {_id:req.params.id},
    {
        $set:{
            bio:req.body.bio
        }
    },
    { new:true, upsert:true, setDefaultsOnInsert:true },
    (error,docs)=>{
        if(!error){
           return res.send(docs);
        }else{
            return res.status(500).send({message:error});
        }
    })} catch(err){
        res.status(500).json({"message":err})
    }
}

module.exports.delete = async(req,res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "user unknown" });
    }

    try{
        await userModel.remove({_id:req.params.id}, (error, docs)=>{
            if(!error){
                return res.status(200).json({"message":"user deleted with succesfull"})
            }else{
                return res.status(500).send({message:error});
            }
        })
    } catch(err){
        return res.status(500).send({message:err});
    }
};

module.exports.follow = async(req, res)=>{
    if (!objectId.isValid(req.params.id) || !objectId.isValid(req.body.id)) {
        return res.status(400).json({ "error": "user unknown" });
    }

    try{
        await userModel.findByIdAndUpdate(req.params.id,
            {
                $addToSet:{following:req.body.id}
            },
            {new:true, upsert:true},
            (error, docs)=>{
                if(!error){
                    return res.status(201).json({docs})
                }
                else{
                    return res.status(500).send({error});
                }
            }
            )

        // await userModel.findByIdAndUpdate(req.body.id,
        //     {
        //         $addToSet: { follower: req.params.id }
        //     },
        //     { new: true, upsert: true },
        //     (error, docs) => {
        //         if (!error) {
        //             return res.status(201).json({ docs })
        //         }
        //         else {
        //             return res.status(500).send({ error });
        //         }
        //     }
        // )
    } catch (err){
        return res.status(500).send({ message: err });
    }

}

module.exports.unfollow = async (req, res)=>{
    if (!objectId.isValid(req.params.id) || !objectId.isValid(req.body.id)) {
        return res.status(400).json({ "error": "user unknown" });
    }

    try {
        await userModel.findByIdAndUpdate(req.params.id,
            {
                $pull: { following: req.body.id }
            },
            { new: true, upsert: true },
            (error, docs) => {
                if (!error) {
                    return res.status(201).json({docs})
                }
                else {
                    return res.status(500).send({error});
                }
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }

    try {
        await userModel.findByIdAndUpdate(req.body.id,
            {
                $pull: { follower: req.params.id }
            },
            { new: true, upsert: true },
            (error, docs) => {
                if (!error) {
                    return res.status(201).json({ message: succes })
                }
                else {
                    return res.status(500).send({ message: error });
                }
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

module.exports.addFrinde = async (req, res)=>{
    if (!objectId.isValid(req.params.id) || !objectId.isValid(req.body.id)) {
        return res.status(400).json({ "error": "user unknown" });
    }

    try{
        await userModel.findByIdAndUpdate(req.params.id,
            {
                $addToSet: { follower: req.body.id }
            },
            { new: true, upsert: true },
            (error, docs) => {
                if (!error) {
                    return res.status(201).json({ docs })
                }
                else {
                    return res.status(500).send({ error });
                }
            }
        )
    } catch(err){

    }
}
module.exports.unInvite = async(req, res)=>{
    if (!objectId.isValid(req.params.id) || !objectId.isValid(req.body.id)) {
        return res.status(400).json({ "error": "user unknown" });
    }

    try {
        await userModel.findByIdAndUpdate(req.params.id,
            {
                $pull: { following: req.body.id }
            },
            { new: true, upsert: true },
            (error, docs) => {
                if (!error) {
                    return res.status(201).json({ docs })
                }
                else {
                    return res.status(500).send({ error });
                }
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }

}

// module.exports.updatePassword = async(req, res){
//     if (!objectId.isValid(req.params.id) || !objectId.isValid(req.body.id)) {
//         return res.status(400).json({ "error": "user unknown" });
//     }

//     try {

//         await userModel.findByIdAndUpdate()     
//     } catch (error) {
            
//     }
// }