const jwt = require('jsonwebtoken');
const users = require('../model/user.model');

module.exports.verifieToken = async (req, res, next)=>{
    const token= req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWTKEYSECRET, async (error, decoded)=>{
            if(error){
                res.locals.user = null;
                //res.cookies('jwt', '', { maxAge: 1 } );
            }else{
                let user = await users.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
    }
   
}