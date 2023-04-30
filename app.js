const express = require('express');
const app = express();
const cors = require('cors');

const { router } = require("./router/user.router");

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.static("public"));

app.use('/user', router);


module.exports = app;