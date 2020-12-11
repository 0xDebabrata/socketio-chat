let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    io.emit('disconnect', 'A user has disconnected')
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})


http.listen(3000, () => {
  console.log('App listening on port 3000')
})