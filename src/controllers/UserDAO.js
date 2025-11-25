const db = require('../config/database/index')
const User = require('../models/User')
const Book = require('../models/Book')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const imageFields = [
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1},
    {name:'image5',maxCount:1},
]
const slugify =require('slugify')
class UserDAO{
    index(req,res)
    {
         const userRow = db.prepare('SELECT * FROM users WHERE username=?').get(req.params.id)
            const user = new User(userRow)
            const bookRow = db.prepare('SELECT * FROM books WHERE status=?').all('true')
            const books = bookRow.map(row=> new Book(row))
            res.render('pages/user/UserHome',{
                books :books,
                user : user 
            })
    }
    createBook(req,res)
    {
        const userRow = db.prepare('SELECT * FROM users WHERE username=?').get(req.params.id)
        const user = new User(userRow)
        res.render('pages/book/UpBook',{
            user : user
        })
    }
    upBook(req,res)
    {
        const id = req.params.id
        const {name,category,condition,desciption,author,price} = req.body
        const file = req.files
        const getBufferOrNull = (filesObject, fieldName) => {
            const fileArray =filesObject[fieldName]
            return (fileArray && fileArray.length > 0) ? fileArray[0].buffer :null 
        }
        const imageBuffers = [
            getBufferOrNull(file,'image1'),
            getBufferOrNull(file,'image2'),
            getBufferOrNull(file,'image3'),
            getBufferOrNull(file,'image4'),
            getBufferOrNull(file,'image5')
            
        ]
        const options ={
            lower:true,
            strict: true,
            trim: true
        }
        const ex =  db.prepare('INSERT INTO books(username,name,category,condition,status,deleted,slug,price,desciption,vote,view,author,image1,image2,image3,image4,image5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run([
            id,name,category,condition,'false','false',slugify(name,options),price,desciption,0.0,0,author,imageBuffers[0],imageBuffers[1],imageBuffers[2],imageBuffers[3],imageBuffers[4]
        ])
        res.redirect(`/user/${req.params.id}`)

    }
    manageBook(req,res)
    {
        const id = req.params.id
        const sql1 = db.prepare('SELECT * FROM books WHERE username=? AND status=?').all([id,'true'])
        const bookAccepted = sql1.map(row => new Book(row))
        const sql2 = db.prepare('SELECT * FROM books WHERE username=? AND status=?').all([id,'false'])
        const bookUnaccepted = sql2.map(row=> new Book(row))
        const userrow = db.prepare('SELECT * FROM users WHERE username=?').get(id)
        const user = new User(userrow)
        res.render('pages/book/ManageBook',{
            bookAccepted : bookAccepted,
            bookUnaccepted : bookUnaccepted,
            user : user
        })
    }
}
module.exports = new UserDAO
module.exports.upload = upload; 
module.exports.imageFields = imageFields;