const db = require('../config/database/index')
const User  = require('../models/User')
const Account = require('../models/Account')
const Book = require('../models/Book')
const Admin = require('../models/Admin')
class LoginDAO{
    index(req,res){
        res.render('pages/LoginUser')
    }
    checkUser(req,res)
    {
        const {id, password} = req.body
        const accountRow = db.prepare('SELECT * FROM accounts WHERE username=? AND password=?').get([id,password])
        if(accountRow != null)
        {
            res.redirect(`/user/${id}`)
        }
        else{
            res.redirect('/login/user')
        }
    }
    checkAdmin(req,res)
    {
        const {id, password} = req.body
        const accountRow = db.prepare('SELECT * FROM accounts WHERE username=? AND password=?').get([id,password])
        if(accountRow != null)
        {
            res.redirect(`/admin/${id}`)
        }
        else{
            res.redirect('/login/admin')
        }
    }
}

module.exports = new LoginDAO