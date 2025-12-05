const userRoute = require('./userRoute');
const bookRoute = require('./bookRoute');

const route = (app)=>{
    app.use('/',userRoute);
    app.use('/book',bookRoute);
}

module.exports = route;