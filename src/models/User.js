class User
{
    constructor(row)
    {
        this.username = row.username
        this.name = row.name
        this.dob = row.dob
        this.gender = row.gender
        this.address  = row.address
        this.phone = row.phone
        this.slug = row.slug
        this.createdat= row.createdat
        this.updatedat =row.updatedat
        this.deleted = row.deleted
        this.avatar = row.avatar
    }
    
}
module.exports  = User
