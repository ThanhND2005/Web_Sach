const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs')
const path = require('path')
const methodOverride = require('method-override')
function start()
{
    app.use(express.static(path.join(__dirname,'..','public')))
    app.use(methodOverride('_method'))
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.set('view engine','ejs')
    app.set('views',path.join(__dirname,'/views'))
    const route = require('./routes/index')
    route(app)
    app.listen(port,()=>console.log("App listen to "+ "http://localhost:" + port + "/login/user"))

}
module.exports = start 