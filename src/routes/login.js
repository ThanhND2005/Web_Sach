const express = require('express')
const route = express.Router()
const LoginDAO = require('../controllers/LoginDAO')

route.get('/user', LoginDAO.index)
route.get('/admin',LoginDAO.index)
route.post('/user',LoginDAO.checkUser)
route.post('/admin',LoginDAO.checkAdmin)

module.exports = route