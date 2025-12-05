require('dotenv').config();
const express  = require('express');
const app = express();
const port = process.env.PORT;
const connection = require('./config/database');
const viewEngine = require('./config/viewEngine');
const configSession = require('./config/session');
const route = require('./routes/index');
const methodOverride = require('method-override');
viewEngine(app);
configSession(app);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended :true}));
app.use(express.json());
route(app);
(async () =>{
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Hello Danh Thanh, server listening at http://localhost:${port}/`)})
        
    } catch (error) {
        console.log(error)
    }
// nhớ kĩ đoạn này có dấu ngoặc thể hiện hàm
})()
