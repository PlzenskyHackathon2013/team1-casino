exports.on_connection = function (socket) {
    console.warn('chat commet conection active')
  socket.emit('msg', {
    text: 'hi'
  });
  socket.on('msg', function (data) {
    console.log(data);
  });
};