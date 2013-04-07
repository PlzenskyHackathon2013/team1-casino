exports.on_connection = function (socket) {
    console.warn('chat commet conection active');
    socket.emit('msg', {
        text: 'Welcome'
    });
    socket.broadcast.emit('msg', {
        text: 'New User Connected'
    });
    socket.on('msg', function (data) {
        socket.broadcast.emit('msg', {
            text: data.text
        });
        socket.emit('msg', {
            text: data.text
        });
    });
};