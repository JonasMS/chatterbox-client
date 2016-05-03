// YOUR CODE HERE:
var $posts = $('.posts')[0];
var $input = $('.chatInput')[0];

var app = {
  message: {
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
  },
  posts: {
    total: 0
  },
  init: () => updatePosts(),
  send: () => {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(this.message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
  //make a GET request && post result
    $.get('https://api.parse.com/1/classes/messages', {}, data => {

      for (let post of data.results) {
        var encodedId = (post.objectId);
        if (!newPosts[encodedId]) {
          newPosts.total++;
          newPosts[encodedId] = true; 
          createPost(post);
        }
      }    
    });
  }
};

var message = {
  username: '<script>alert("lololol")</script>',
  text: '',
  roomname: 'lobby'
};

// var responses = $.get('https://api.parse.com/1/classes/messages', function(data) {
//   return data;
// });
var newPosts = {
  total: 0
};

var updatePosts = function() {
  //make a GET request && post result
  $.get('https://api.parse.com/1/classes/messages', {}, function(data) {

    for (let post of data.results) {
      var encodedId = (post.objectId);
      if (!newPosts[encodedId]) {
        newPosts.total++;
        newPosts[encodedId] = true; 
        createPost(post);
      }
    }    
  });
    
};
var createPost = function(postData) {
  var $framePost = $('<div class= "post" ' + newPosts.total + '></div>');
  var $username = $('<div class="username"></div>');
  var $text = $('<div class="text"></div>');
  var $time = $('<div class="time"></div');

  $framePost.append($username);
  $framePost.append($text);
  $framePost.append($time);
  $('.posts').append($framePost);

  $username.text(postData.username);
  $text.text(postData.text);
  $time.text(postData.createdAt);

};

// <div >
//   <div class=username></div>
//   <div class=post></div>
//   <div class=time></div>
// </div>

$('.submitBtn').click(function() {
  //save value from chatInput
  var textMessage = $input.value;
  //add value to message object
  message.text = textMessage;

  //submit a ajax post request of message
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
  
  //clear $input
  $input.value = '';
  //TODO: call ajax GET request on click
});

setInterval(function() { updatePosts(); }, 100);



//for every element in responses.responseJSON.results
  //

// $('.post').append(responses.responseJSON.results[0].text);

