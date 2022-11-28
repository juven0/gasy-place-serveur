const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        posterId : {
                type : String,
                required : true
        },
        message : {
                type: String,
                trim : true,
        },
        picture : {
                type: String,
        },
        likers : {
                type :[String],
                required : true,
        },
        comments : {
                type : [
                    {
                        commenterId: String,
                        commenterNom: String,
                        commenterPrenom:String,
                        text: String,
                        timestamp: Number
                    }    
                ],
                required: true,
        },
    },
    {
        timestamps:true,
    }
);
const postModele = mongoose.model('post', postSchema);
module.exports =postModele;