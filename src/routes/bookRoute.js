const express = require('express');
const route = express.Router();
const bookController  =require('../controllers/bookController');
const uploadCloudinary = require('../config/cloudinary');
route.post('/create',uploadCloudinary.array('images',3),bookController.createBook);
route.get('/detail/:id',bookController.detailBook);
route.patch('/accept/:id',bookController.acceptBook);
route.patch('/soft-delete/:id',bookController.softdeleteBook);
route.delete('/delete/:id',bookController.deleteBook);
route.patch('/restore/:id',bookController.restoreBook);

module.exports = route;