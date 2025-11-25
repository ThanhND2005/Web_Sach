class Book{
    constructor(row){
        this.username = row.username
        this.name = row.name
        this.category = row.category
        this.condition = row.condition
        this.status = row.status
        this.deleted = row.deleted
        this.createdat = row.createdat
        this.updatedat = row.updatedat
        this.slug = row.slug
        this.price =row.price
        this.desciption =row.desciption
        this.vote = row.vote
        this.view =row.view
        this.image = row.image
        this.author = row.author
    }
}
module.exports = Book