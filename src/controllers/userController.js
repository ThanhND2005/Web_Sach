const User = require('../models/user');
const Book = require('../models/book');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createUser = async (req ,res) =>{
    try {
        const {name, username, password} = req.body;
        const hashPassword = await bcrypt.hash(password,saltRounds);
        const result = await User.create({
            name : name,
            username : username,
            password : hashPassword,
            avatar : "https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg"
        });
        res.status(200).json({result});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error});
    }

}
const updateAvatar =  async(req,res) =>{
    if(req.file)
    {
        avatarUrl = req.file.path;
    }
    try {
        const result = await User.updateOne({username : req.session.username},{avatar : avatarUrl});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('update avatar failed !');
    }
}
const getHome = async (req,res)=>{
    if(req.session.user)
    {
        const user = req.session.user;
        try {
            const books = await Book.find({status:'false',delete:'false'}).lean();
            res.status(200).json(books);
        } catch (error) {
            console.log(error);
            res.status(500).send('khong lay duoc du lieu');   
        }
        
    }
    else {
        res.status(401).json({message:'ban chua dang nhap'})
    }
}
const getLoginPage = (req,res)=>
{
    res.status(200).json({message : 'nhap tai khoan mat khau'});
}
const checkUser = async (req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username : username}).lean();
        if (user && bcrypt.compare(password,user.password))
        {
            req.session.user = user;
            res.status(200).json(user);
        }
        else{
            res.status(401).json({message : 'Thông tin đăng nhập không hợp lệ'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const logout = (req,res)=>{
    try {
        req.session.destroy();
        res.status(200).json({message : 'dang xuat thanh cong'})
    } catch (error) {
        console.log(error);
        res.status(500).send('khong the logout');
    }
}
const getWeather = async (req,res)=>{
    try {
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=hà nội&appid=c34d0b30de706ed953190741dcd852f2&units=metric&lang=vi';
        const respone = await fetch(url);
        if (!respone.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataApi = await respone.json();
        res.status(200).json(dataApi);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('khong lay duoc du lieu thoi tiet');
    }
}
module.exports = {
    createUser : createUser,
    updateAvatar : updateAvatar,
    getHome : getHome,
    getLoginPage : getLoginPage,
    checkUser : checkUser,
    logout : logout,
    getWeather : getWeather
}

