const databse = require('better-sqlite3')
const path = require('path')
const dbPath = path.resolve(__dirname, '../websach.db');
const db = new databse(dbPath,{verbose: console.log})
db.pragma('journal_mode = WAL')
console.log('ket noi thanh cong')
module.exports = db