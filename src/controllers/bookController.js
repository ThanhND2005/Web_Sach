const Book = require('../models/book');
const User = require('../models/user');

const createBook = async (req,res)=>{
    try {
        let imageUrls = [];
        if (req.files && req.files.length > 0){
            imageUrls = req.files.map(file => file.path);
        }
        let book = await Book.create({
            title : req.body.title || null,
            category : req.body.category || null,
            author : req.body.author || null,
            description : req.body.description,
            price : req.body.price,
            name : req.session.user.name,
            username : req.session.user.username,
            status : 'false',
            delete : 'false',
            image1 : imageUrls[0],
            image2 : imageUrls[1],
            image3 : imageUrls[2],
        })
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(301).send('tao thong tin sach khogn thanh cong');
    }
}

const detailBook = async (req,res) =>{
    const id  = req.params.id;
    try {
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500);
    }

}

const acceptBook = async (req,res) =>{
    const id  = req.params.id;
    try {
        const book = await Book.findByIdAndUpdate(id,{status :'true'});
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send('khong duyet duoc sach');
    }
}

const softdeleteBook = async (req,res)=>{
    const id = req.params.id;
    try{
        const book = await Book.findByIdAndUpdate(id,{delete :'true'});
        res.status(200).json(book);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Xoa mem that bai');
    }
}

const deleteBook = async (req, res) =>{
    const id = req.params.id;
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).send('xoa thanh cong');
    } catch (error) {
        console.log(err);
        res.status(500).send('Xoa that bai');
    }
}

const restoreBook = async (req,res)=>{
    const id  = req.params.id;
    try {
        await Book.findByIdAndUpdate(id,{delete: 'flase'});
        res.status(200).send('da restore lai sach')
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}
module.exports = {
    createBook :createBook,
    detailBook : detailBook,
    acceptBook : acceptBook,
    softdeleteBook : softdeleteBook,
    deleteBook :deleteBook,
    restoreBook :restoreBook,
}