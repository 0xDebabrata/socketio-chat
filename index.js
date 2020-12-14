let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', (socket) => {

  // Broadcast when user joins chat
  socket.broadcast.emit('welcome', 'New user has entered the chat')

  // Broadcast when a user disconnects
  socket.on('disconnect', () => {
    msg = socket.id + ' has disconnected'
    socket.broadcast.emit('user::disconnect', msg)
  })
  
  // Broadcast user messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })

})

http.listen(3000, () => {
  console.log('App listening on port 3000')
})