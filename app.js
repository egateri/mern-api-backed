require('dotenv').config();
const db =require('./config/database');
const cors =require('cors')
const registerRouter = require('./routes/register');
const protectedRouter = require('./routes/protected');
const loginRouter = require('./routes/login');
const notFoundRouter = require('./routes/notfound');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
app.set(db);
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(registerRouter);
app.use(protectedRouter);
app.use(loginRouter);
app.use(notFoundRouter);
app.listen(PORT,()=>{
    console.log("Server running on port " +PORT);
})

