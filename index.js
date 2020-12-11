let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('A user has disconnected')
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})


http.listen(3000, () => {
  console.log('App listening on port 3000')
})