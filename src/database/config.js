require('dotenv').config();

const mongoose = require('mongoose');

const dbConnection =async () =>{
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB connected');
    }catch(err){
        console.log(err)
    }
}

module.exports = dbConnection;