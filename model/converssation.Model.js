const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    membres: {
        type: [String],
        required: true,
    }
},
    {
        timestamps: true,
    })

const conversationModel = mongoose.model('conversation', conversationSchema);
module.exports = conversationModel;