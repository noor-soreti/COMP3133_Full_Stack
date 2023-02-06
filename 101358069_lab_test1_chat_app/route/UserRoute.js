const express = require('express');
const userModel = require('../model/User');
const app = express();

var path = require('path')
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get("/", async (req, res) => {
    res.sendFile(path.resolve(__dirname,'../index.html'));
})

io.on('connection', function(socket) {
    console.log("hi there");
})



module.exports = app
