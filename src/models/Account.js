
class Account{
    constructor(row){
        this.username = row.username
        this.password = row.password
        this.role = row.role
    }
}

module.exports = Account