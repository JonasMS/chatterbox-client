// YOUR CODE HERE:

var message = {
  username: 'netflix&chill',
  text: 'whatever bro',
  roomname: 'broski'
};

$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

// var responses = $.get('https://api.parse.com/1/classes/messages', function(data) {
//   return data;
// });

$.get('https://api.parse.com/1/classes/messages', {}, function(data) { 
  $('.post').append(data.results[0].text);
});


//for every element in responses.responseJSON.results
  //

// $('.post').append(responses.responseJSON.results[0].text);

