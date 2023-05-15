const express = require('express');
const app = express();
const cors = require('cors');

const { router } = require("./router/user.router");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.static("public"));

app.use('/user', router);


module.exports = app;