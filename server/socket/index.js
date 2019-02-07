module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('35,-122,1-19-19', function(msg) {
      console.log('Message is: ', msg)
      io.emit('35,-122,1-19-19', msg)
      //socket.broadcast.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
