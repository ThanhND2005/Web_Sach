const express = require('express')
const route = express.Router()
const UserDAO = require('../controllers/UserDAO')
const User = require('../models/User')
route.post('/avatar/:id',UserDAO.upload.single('avatar'), UserDAO.updateAvatar)
route.get('/avatar/:id',UserDAO.loadAvatar)
route.post('/infor/:id',UserDAO.udpateInfor)
route.get('/infor/:id',UserDAO.indexInfor)
route.get('/:id/manage-book',UserDAO.manageBook)
route.post('/:id/create-book',UserDAO.upload.fields(UserDAO.imageFields), UserDAO.upBook)
route.get('/:id/create-book',UserDAO.createBook)
route.get('/:id',UserDAO.index) 

module.exports = route 