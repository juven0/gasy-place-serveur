const express = require('express');
require('dotenv').config({path : "./.env"});
const bodyPasrser = require('body-parser');
const cookieParesr = require('cookie-parser');
const jwtControler = require('./controler/jwtControler');
const userRoutes = require('./routes/user_routes');
const messageRoutes = require('./routes/message_routes');
const postRoutes = require('./routes/post_route');
const cors = require('cors');
const socket = require('socket.io')
const conversationRoutes = require('./routes/converation.routes')
const path = require('path')
//const fileUpload = require('express-fileupload');
require('./db/mongodb');



const app = express();

app.use(cors())
app.use(bodyPasrser.json());
app.use(bodyPasrser.urlencoded({extended : true}));
app.use(cookieParesr());
app.use(express.static('./public'));
//app.use(fileUpload());

//jwt
//app.get('*' , jwtControler.verifieToken)
app.get('/jwt',jwtControler.verifieToken,(req, res)=>{
    res.status(200).json(res.locals.user._id)
    
});
//routes
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/post', postRoutes);
app.use('/api/conversation', conversationRoutes);
app.post('/api/image',(req,res)=>{
    const re= req.body.urlimg
    let urlImage = path.join(__dirname,re)
    res.sendFile(urlImage)
})



const server = app.listen(process.env.PORT,()=>{
    console.log(`serveur running on port ${process.env.PORT}`);
})

const io = socket(server,{ cors :{
    origin:'*'
}
})

global.onlineUsers = new Map();

io.on('connection' , (socket)=>{
    console.log(socket.id)
    global.chatSocket= socket;
    console.log('un utilisateur connecter')
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId, socket.id)
    })
    socket.on('send-message' , (data)=>{
       io.emit('message')
    })
    socket.on('new-post', (data) => {
        io.emit('post')
    })
    
})