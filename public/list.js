$(document).ready(function() {
  var chat_comet = io.connect('http://firstapp-casino.ph');
  chat_comet.on('msg', function (msg) {
    // replace the contents of the div 
    $('#chat_msgs').html('<div>' + msg.text + '</div>');
  });
});
