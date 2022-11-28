const postModel = require('../model/post.Model');
const userModel = require('../model/user.model.js');
const objectId = require('mongoose').Types.ObjectId;

module.exports.create = async(req, res)=>{

        const newPost = new postModel({
            posterId: req.body.id,
            message: req.body.message,
            picture: req.file!= null? req.file.path : "",
            likers:[],
            commensts:[],
            })
        try{
            const post = await newPost.save()
            return res.status(201).json(post);
        }catch(err){
            res.status(400).json({ 'error': "can't create post" })
        }
           
};

module.exports.view = async(req, res)=>{

        const post = await postModel.find((err, docs)=>{
            if(!err){
                return res.status(201).send(docs);
            }else{
                res.status(200).json({ 'error': "can't find post" }); 
            }
        });
};

module.exports.update = async(req, res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "post unknown" });
    }

    const updateMessage = {
        message :req.body.message
    }
    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateMessage},
        {new: true},
        (err, docs)=>{
            if (!err) {
                return res.status(201).send(docs);
            } else {
                res.status(400).json({ 'error': "can't update post" });
            }
        }
    )
}

module.exports.delete = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "post unknown" });
    }

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs)=>{
            if (!err) {
                return res.status(201).send(docs);
            } else {
                res.status(400).json({ 'error': "can't delet post" });
            }
        }
    )
}

module.exports.liksPost = async (req, res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "post unknown" });
    }

    try{
        await postModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet : {likers: req.body.id}},
            {new: true},
            (err, docs)=>{
                if(err){
                    res.status(400).json({ 'error': err });
                }
            }
        );
        await userModel.findByIdAndUpdate(
            req.body.id,
            { $addToSet: { likes: req.params.id } },
            { new: true },
            (err, docs) => {
                if (err) {
                    res.status(400).json({ 'error': err });
                }else{
                    return res.status(200).send(docs);
                }
            })
    }catch(err){
        res.status(400).send(err);
    }
}
module.exports.unLiksPost = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "post unknown" });
    }

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.id } },
            { new: true },
            (err, docs) => {
                if (err) {
                    res.status(400).json({ 'error': err });
                }
            }
        );
        await userModel.findByIdAndUpdate(
            req.body.id,
            { $pull: { likes: req.params.id } },
            { new: true },
            (err, docs) => {
                if (err) {
                    res.status(400).json({ 'error': err });
                } else {
                    return res.status(200).send(docs);
                }
            })
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports.comment = async(req, res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "post unknown" });
    }

    try{
        postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push :{
                    comments :{
                        commenterId: req.body.id,
                        commenterNom: req.body.nom,
                        commenterPrenom: req.body.prenom,
                        text: req.body.text,
                        timestamp:new Date().getTime()
                    }
                }
            },
            {new: true},
            (err, docs)=>{
                if(!err){
                    return res.status(201).send(docs)
                }else{
                    return res.status(201).send(err)
                } 
            }
        )
    }catch(err){
        res.status(201).send(err)
    }
}
module.exports.deleteComment = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ "error": "post unknown" });
    }
    try {
        postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull : {
                    comments :
                    {_id: req.body.commentId}
                }
            },
            {new:true},
            (err, docs)=>{
                if (!err) {
                    return res.status(201).send(docs)
                } else {
                    return res.status(400).send(err)
                } 
            }
        )
    }catch(err){
        return res.status(400).send(err)
    }
}
module.exports.uploadPicture = async (req, res)=>{
    
}
