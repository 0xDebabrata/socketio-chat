let socket = io('ws://localhost:3000');
let message = document.getElementById('input')
let list = document.getElementById('messages')

// Send chat message to server for broadcast
let emit = event => {
  event.preventDefault()
  socket.emit('chat message', message.value);
  message.value = ''
  return false
}

// Display chat messages
socket.on('chat message', (msg) => {
  let li = document.createElement('li')
  li.setAttribute('class', 'msg')
  li.innerHTML = msg
  list.appendChild(li)
})

// User disconnect alert
socket.on('user::disconnect', msg => {
  alert(msg)
})

// Welcome message when new user joins chat
socket.on('welcome', msg => {
  let li = document.createElement('li')
  li.setAttribute('class', 'welcome')
  li.innerHTML = msg
  list.appendChild(li)
})