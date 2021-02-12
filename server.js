const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const server= require('http').createServer(app);
const io= require('socket.io')(server);
const { loadMessages, checkForRoom, writeMessage, createRoom } = require('./controllers/chatController');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nerdherd");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

io.on("connection", socket => {
  socket.on('info', (info) => {
      socket.join(info.room);
      socket.emit('userjoin', `${info.user} has joined chat room: ${info.room}`);
      checkForRoom(info.room, (data) => {
          if (data) {
              loadMessages(info.room, (res) => {
                  if (res) socket.emit('savedmsgs', res.messages);
              })
          } else {
              createRoom(info.room, info.user);
          }
      })
      
  })
console.log(socket.id);

socket.on('event', (data) => {
  writeMessage(data.room, data.sender, data.msg);
  io.to(data.room).emit('message', {sender: data.sender, msg: data.msg});
  })
})

const env = require('dotenv');
env.config();
