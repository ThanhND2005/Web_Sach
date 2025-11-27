const db = require('../config/database/index')
const Admin =require('../models/Admin')
const Book = require('../models/Book')
const User = require('../models/User')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload =  multer({storage:storage})
const imageField = [{name:'avatar',maxCount:1}]
class AdminDAO{
    index(req,res)
    {
            const adminRow = db.prepare('SELECT * FROM admin WHERE username=?').get(req.params.id)
            const admin = new Admin(adminRow)
            const bookRow = db.prepare('SELECT * FROM books WHERE status=?').all('false')
            const books = bookRow.map(row=> new Book(row))
            res.render('pages/admin/AdminHome',{
                books :books,
                admin : admin 
            })
    }
    getListUser(req,res)
    {
        const id = req.params.id 
        const userRow = db.prepare('SELECT * FROM users').all()
        const users = userRow.map(row => new User(row))
        const adminRow = db.prepare('SELECT * FROM admin WHERE username=?').get(id)
        const admin = new Admin(adminRow)
        res.render('pages/admin/ManageUser',{
            users : users,
            admin : admin
        })
    }
    restoreBook(req,res)
    {
        const id = req.params.id 
        const adminrow = db.prepare('SELECT * FROM admin WHERE username=?').get(id)
        const admin = new Admin(adminrow)

        const ex = db.prepare('UPDATE books SET deleted=? WHERE slug=?').run(['false',req.params.slug])
        res.redirect( `/admin/trash-book/${id}`)
    }
    getTrashBook(req,res)
    {
        const id = req.params.id 
        const adminrow = db.prepare('SELECT * FROM admin WHERE username=?').get(id)
        const admin = new Admin(adminrow)
        const bookrow = db.prepare('SELECT * FROM books WHERE deleted=?').all('true')
        const books = bookrow.map(row => new Book(row))
        res.render('pages/admin/TrashBook',{
            admin : admin,
            books : books
        })
    }
    deleteBook(req,res)
    {
        const slug =  req.params.slug
        const id = req.params.id  
        const ex = db.prepare('UPDATE books SET deleted=? WHERE slug=?').run(['true',slug])
        res.redirect(`/admin/manage-book/${id}`)
    }
    getListBook(req,res)
    {
        const id  = req.params.id
        const adminRow = db.prepare('SELECT * FROM admin WHERE username=?').get(id)
        const admin = new Admin(adminRow)
        const bookRow = db.prepare('SELECT * FROM books WHERE status=? AND deleted=?').all(['true','false'])
        const books = bookRow.map(row => new Book(row))
        res.render('pages/admin/ManageBook',{
            admin :admin,
            books : books
        })
    }
    getInfor(req,res)
    {
        const id = req.params.id
        const adminRow = db.prepare('SELECT * FROM admin WHERE username=?').get(id)
        const admin = new Admin(adminRow)
        res.render('pages/admin/AdminInfor',{
            admin:admin
        })
    }
    updateInfor(req,res)
    {
        const id = req.params.id 
        const {name,dob,gender,address,phone} = req.body 
        const ex = db.prepare('UPDATE admin SET name=?,dob=?,gender=?,address=?,phone=? WHERE username=?').run([name,dob,gender,address,phone,id])
        res.redirect(`/admin/infor/${id}`)
    }
    loadAvatar(req,res)
    {
        const id  = req.params.id 
        const row = db.prepare('SELECT avatar FROM admin WHERE username=?').get(id)
        
        res.send(row.avatar)
    }
    updateAvatar(req,res)
    {
        const id = req.params.id 
        const file = req.file 
        const getBufferOrNull = (filesObject) =>{
            if(filesObject && filesObject.buffer)
            {
                return filesObject.buffer
            }
            else {
                return null 
            }
        }
        const imageBuffer = getBufferOrNull(file) 
        const ex = db.prepare('UPDATE admin SET avatar=? WHERE username=?').run([imageBuffer,id])
        res.redirect(`/admin/infor/${id}`)
    }
}
module.exports = new AdminDAO 
module.exports.upload = upload
module.exports.imageField = imageField