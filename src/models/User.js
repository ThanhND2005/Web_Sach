const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    username : {type : String, unique : true}, 
    password : String,
    avatar : String,

});

const User = mongoose.model('user',userSchema);
module.exports = User;