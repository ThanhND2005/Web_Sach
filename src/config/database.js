require('dotenv').config();
const mongoose = require('mongoose');

const connection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGGO_DB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = connection;