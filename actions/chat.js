exports.on_connection = function (socket) {
    console.warn('chat commet conection active');
    socket.emit('msg', {
        text: 'Welcome'
    });
    socket.on('msg', function (data) {
        socket.emit('msg', {
            text: data.text
        });
    });
};