const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// const userRouter = require('./route/UserRoute.js');
// const userModel = require('./model/User');
const path = require('path')

const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use(express.static(__dirname));
app.use(bodyParser.json());  // Make sure it comes back as json
app.use(bodyParser.urlencoded({extended: false}))

mongoose.set('strictQuery', true);

// Connect to mongo
mongoose.connect(`mongodb+srv://sa:TXEt5Ngiu7WVcU9P@cluster0.r8uhczt.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

// Login page
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/app/index.html");
})

// socket.io connection


io.on('connection', (socket) => {
  console.log('user has connected');
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
