require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const configSession = (app) => {
    app.use(session({
        secret : process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
        store : MongoStore.create({
            mongoUrl: process.env.MONGGO_DB_URL,
            ttl : 1000*60*5
        }),
        cookie :{
            secure : false,
            httpOnly : true,
            maxAge :  1000*60*5
        }
    }));
}

module.exports = configSession;