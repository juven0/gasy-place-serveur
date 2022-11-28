const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    converastionId:{
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type:String,
        required:true,
    },
    posterId:{
        type:String,
        required:true,
        trim:true,
    },
    receverId:{
        type: String,
        required: true,
        trim: true,
    }
  },
  {
      timestamps:true,
  })

const messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel;