require("dotenv").config();

const express = require('express');
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const {isActiveRoute} = require("./server/helpers/routeHelpers");

//setting up express
const app = express();
const port = 3000 || process.env.PORT;


//connect to Database
connectDB();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

//public folder setup
app.use(express.static("public"));

//template engine setup
app.use(expressLayout);
app.set("layout","./layouts/main");
app.set("view engine","ejs");

app.locals.isActiveRoute = isActiveRoute;

//routes
app.use('/',require("./server/routes/main"));
app.use('/',require("./server/routes/admin"));

//app launch
app.listen(port, () => console.log(`Example app listening on port ${port}!`));