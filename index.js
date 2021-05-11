const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv/config');
const { PORT } = require('./app/config');
const auth = require("./app/middleware_auth");

// ROutes import 
const routeProject = require('./app/projects/route.project');
const routeUser = require('./app/users/route.user');

const app = express();

app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:8088', 'http://localhost:8087', 'http://127.0.0.1:4200', 'http://localhost:5555'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// MiddleWares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/user', routeUser);
app.use('/project', auth, routeProject);

// connection to the DB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to dataBase");
    app.listen(PORT, () => {
        console.log(`Server start on port: ${PORT}`);
    });
})
.catch(err => {
    console.log(err);
});