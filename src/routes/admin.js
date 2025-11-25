const express = require('express')
const route = express.Router()
const AdminDAO = require('../controllers/AdminDAO')
const BookDAO = require('../controllers/BookDAO')
route.get('/manage/:id/:slug',BookDAO.indexWaitingBook)
route.get('/:id',AdminDAO.index)
module.exports = route