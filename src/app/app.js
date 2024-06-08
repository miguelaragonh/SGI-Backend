const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const router = require("../router/router")
const app = express();

app.use(cors({
    origin:'http://localhost:8100',
    credentials : true}));
app.use(morgan("dev"))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(router)
module.exports = app;