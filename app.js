
require('dotenv').config();
const db =require('./config/database');
const cors =require('cors')
const cookieParser = require('cookie-parser');
const registerRouter = require('./routes/register');
const protectedRouter = require('./routes/protected');
const publicRouter = require('./routes/public');
const loginRouter = require('./routes/login');
const logOutRouter = require('./routes/logout');
const loginWithCookieRouter = require('./routes/loginwithcookie');
const notFoundRouter = require('./routes/notfound');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
app.set(db);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(registerRouter);
app.use(protectedRouter);
app.use(publicRouter);
app.use(loginRouter);
app.use(logOutRouter);
app.use(loginWithCookieRouter);
app.use(notFoundRouter);
app.listen(PORT,()=>{
    console.log("Server running on port " +PORT);
})

