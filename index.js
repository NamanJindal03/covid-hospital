const express = require('express');
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const port = 8002;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


/* MiddleWares */
//app.use(express.urlencoded());
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
//Enables All Cors Request
app.use(cors());

//app.use(express.static('./views'));
app.use(express.static('./assets'));

//app.set('views', './views');

/* My Routes */
app.use('/', require('./routes/index.js'));


/* Starting the Server */
app.listen(port, (err)=>{
    if(err){
        console.log(`There is an error: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);
})