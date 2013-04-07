$(document).ready(function() {
  var chat_comet = io.connect('http://firstapp-casino.ph/chat', {'connect timesout': 500});
  //var chat_comet = io.connect('http://localhost/chat:8080');

  chat_comet.on('msg', function (msg) {
    // replace the contents of the div 
    $('#chat_msgs').prepend('<div>' + msg.text + '</div>');
  });

  $("#chat_msg_send").click(function() {
    var text = $('#chat_msg_text').val(); 
    chat_comet.emit('msg', {
        text: text
    });
  });
});
