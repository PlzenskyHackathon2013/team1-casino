$(document).ready(function() {
  var chat_comet = io.connect('http://localhost:8080/chat');
  chat_comet.on('msg', function (data) {
    // replace the contents of the div 
    $('#chat_msgs').html(data);
  });
});
