const db = require('../config/database/index')
const Admin =require('../models/Admin')
const Book = require('../models/Book')
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
}
module.exports = new AdminDAO 
