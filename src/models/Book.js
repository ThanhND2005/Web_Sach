const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : String,
    author : String,
    category : String,
    description : String,
    price : String,
    name : String,
    username : String,
    status : String,
    delete : String,
    image1 : String,
    image2 : String,
    image3 : String
})

const Book = mongoose.model('books',bookSchema);

module.exports = Book;