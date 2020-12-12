let socket = io('ws://localhost:3000');
let message = document.getElementById('input')
let list = document.getElementById('messages')

let emit = event => {
  event.preventDefault()
  socket.emit('chat message', message.value);
  message.value = ''
  return false
}

socket.on('chat message', (msg) => {
  let li = document.createElement('li')
  li.appendChild(document.createTextNode(msg))
  list.appendChild(li)
})

socket.on('user::disconnect', msg => {
  alert(msg)
})