const express = require('express');
const route =express.Router();
const userController = require('../controllers/userController');
const uploadCloud  = require('../config/cloudinary');

route.post('/register',userController.createUser);
route.patch('/updateAvatar',uploadCloud.single('avatar'),userController.updateAvatar);
route.get('/', userController.getHome);
route.get('/login',userController.getLoginPage);
route.post('/login',userController.checkUser);
route.get('/logout',userController.logout);
route.get('/weather',userController.getWeather);
module.exports = route;