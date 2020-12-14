let socket = io('ws://localhost:3000');
let message = document.getElementById('input')
let list = document.getElementById('messages')

// Send chat message to server for broadcast
let emit = event => {
  let date = new Date()
  let msg = {
    message: message.value,
    from: socket.id,
    time: date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }
  event.preventDefault()
  socket.emit('chat message', msg);
  message.value = ''
  return false
}

// Display chat messages
socket.on('chat message', (msg) => {
  displayChat(msg)
  
  window.scrollTo(0, document.body.scrollHeight)
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

let displayChat = msg => {
  
  let li = document.createElement('li')
  let p = document.createElement('p')
  let span = document.createElement('span')
  span.setAttribute('class', 'time')
  span.innerHTML = msg.time
  p.innerHTML = msg.message
  li.appendChild(p)
  li.appendChild(span)
  list.appendChild(li)

  li.setAttribute('class', 'msg')
  if (msg.from === socket.id) {
    li.classList.add('self')
  }
  
}