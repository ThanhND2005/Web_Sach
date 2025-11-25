const express = require('express')
const adminRoute = require('./admin')
const userRoute = require('./user')
const bookRoute = require('./book')
const loginRoute = require('./login')
function route(app){
    app.use('/admin',adminRoute)
    app.use('/user',userRoute)
    app.use('/book',bookRoute)
    app.use('/login',loginRoute)
}
module.exports = route