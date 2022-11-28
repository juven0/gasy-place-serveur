const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {signUpErrors, signInErrors} = require('../utils/errors.utils')
require('dotenv').config("../.env")

const maxAge = 1000 * 60 * 60 * 24 * 30

const createToken = (id)=>{
   return jwt.sign({id},process.env.JWTKEYSECRET,{
       expiresIn: maxAge
   })
}

// const login = async (email, password)=>{
//     userModel.findOne({email:email},(err, docs)=>{
//         if(!err){
//             if(bcrypt.compare(password, docs._id)){
//                 return docs.
//             }
//         }
//     })
// }

module.exports.signUp = async (req, res) =>{
    const {nom, prenom, email, password}= req.body;

    try{
        const user = await userModel.create({nom,prenom,email,password});
        res.status(201).json({user:user._id})
    }catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({errors})
    }
}

module.exports.singnIn = async (req, res)=>{
    const {email, password}= req.body;
    console.log(req.body)
    
    try{
        const user = await userModel.login(email, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, {httpOnly:true ,maxAge:maxAge});
        res.status(200).json({"user":user._id})
          
    } catch(err){
        const errors = signInErrors(err);
        res.status(201).send({errors});
    }
}

module.exports.logout = (req, res)=>{
    res.cookie("jwt", "", { maxAge: 0 });
    res.redirect('/')
}





























// const user = require('../model/usersModel');
// const bcrypt = require('bcrypt')

// module.exports.sigin = async(req, res)=>{

//     const data = req.body;

//     let result = user.creatUser(data);
//     console.log(result);
// };

// module.exports.login = async(req, res)=>{
//     const {email, password} = req.body;

// };