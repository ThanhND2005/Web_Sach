const express = require('express')
const route = express.Router()
const UserDAO = require('../controllers/UserDAO')
route.get('/:id/manage-book',UserDAO.manageBook)
route.post('/:id/create-book',UserDAO.upload.fields(UserDAO.imageFields), UserDAO.upBook)
route.get('/:id/create-book',UserDAO.createBook)
route.get('/:id',UserDAO.index) 

module.exports = route 