const express = require ("express");
const cors = require("cors");
const cookieParser= require('cookie-parser');
require("./config/mongoose.config")
require('dotenv').config()
const app = express ();
const PORT= process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extented: true}));

app.use(cookieParser());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors(
    {credentials: true, origin: 'http://localhost:3000',
    }));

require('./routes/movies.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, ()=>{
    console.log (`SERVER IS RUNNING ON ${PORT}`)
});
