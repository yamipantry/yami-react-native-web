module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('chat message', function(msg) {
      console.log('Message is: ', msg)
      io.emit('chat message', msg)
      // As opposed to socket.broadcast.emit('chat message', msg)
      // which suppresses the message from being to sent back to the original sender (all other clients still get the message)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
