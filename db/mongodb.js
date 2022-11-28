const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/test',
    {
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
    })
    .then(()=>{
        console.log("connected to mongodb");
    })
    .catch((error)=>{
        console.log(error);
    })