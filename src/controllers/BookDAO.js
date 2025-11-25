const db = require('../config/database/index')
const Book = require('../models/Book')
const Admin = require('../models/Admin')
const User = require('../models/User')
class BookDAO{
    indexWaitingBook(req,res)
    {
        const {id,slug} = req.params
        const bookRow = db.prepare('SELECT * FROM books WHERE slug=?').get(slug)
        const book = new Book(bookRow)
        const adminRow = db.prepare('SELECT * from admin WHERE username=?').get(id)
        const admin = new Admin(adminRow) 
        res.render('pages/book/WaitingBook',{
            admin:admin,
            book: book
        })
    }
    indexInforBook(req, res)
    {
        const {id,slug} = req.params 
        const userRow = db.prepare('SELECT * FROM users WHERE username=?').get('thanhvip123')
        const bookRow = db.prepare('SELECT * FROM books WHERE slug=?').get(slug)
        const user = new User(userRow)
        const book = new Book(bookRow)
        res.render('pages/book/InforBook',{
            user : user,
            book: book
        })
    }
    acceptBook(req,res)
    {
        const slug = req.params.slug
        const bookRow = db.prepare('UPDATE books SET status=? WHERE slug=?').run(['true',slug])
        res.redirect(`/admin/${req.params.id}`)
    }
    loadImage1(req,res)
    {
        const slug = req.params.slug
        const sql = 'SELECT image1 FROM books WHERE slug=?'
        const row = db.prepare(sql).get(slug)
        res.setHeader('Content-type','image/png')
        res.send(row.image1)
    }
    loadImage2(req,res)
    {
        const slug = req.params.slug
        const sql = 'SELECT image2 FROM books WHERE slug=?'
        const row = db.prepare(sql).get(slug)
        res.setHeader('Content-type','image/png')
        res.send(row.image2)
    }
    loadImage3(req,res)
    {
        const slug = req.params.slug
        const sql = 'SELECT image3 FROM books WHERE slug=?'
        const row = db.prepare(sql).get(slug)
        res.setHeader('Content-type','image/png')
        res.send(row.image3)
    }
    loadImage4(req,res)
    {
        const slug = req.params.slug
        const sql = 'SELECT image4 FROM books WHERE slug=?'
        const row = db.prepare(sql).get(slug)
        res.setHeader('Content-type','image/png')
        res.send(row.image4)
    }
    loadImage5(req,res)
    {
        const slug = req.params.slug
        const sql = 'SELECT image5 FROM books WHERE slug=?'
        const row = db.prepare(sql).get(slug)
        res.setHeader('Content-type','image/png')
        res.send(row.image5)
    }

}
module.exports = new BookDAO