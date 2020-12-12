let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', (socket) => {

  // Broadcast when user joins chat
  socket.on('connect', () => {
    msg = 'User has entered the chat'
    socket.broadcast.emit('welcome', msg)
  })

  // Broadcast when a user disconnects
  socket.on('disconnect', () => {
    msg = socket.id + ' has disconnected'
    socket.broadcast.emit('user::disconnect', msg)
  })
  
  // Broadcast user messages
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  })

})

http.listen(3000, () => {
  console.log('App listening on port 3000')
})