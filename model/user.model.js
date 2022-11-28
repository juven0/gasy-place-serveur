const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        nom:{
            type:String,
            required:true,
            minLength:3,
            max:50,
            trim:true,
        },
        prenom:{
            type:String,
            required: true,
            minLength: 3,
            max: 50,
            trim:true,
        },
        email:{
            type:String,
            required: true,
            lowercase:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required: true,
            minLength:8,
            max:1024
        },
        bio:{
            type:String,
            max:1024
        },
        follower:{
            type:[String]
        },
        following:{
            type: [String]
        },
        likes:{
            type: [String]
        },
        picture:{
            type: String
        }
    },
    {
        timestamps:true,
    }
)

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;