const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv/config');
const { PORT } = require('./app/config');
const auth = require("./app/middleware_auth");


const app = express();

// MiddleWares
app.use(cors());
app.use(bodyParser.json());

// Routes

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