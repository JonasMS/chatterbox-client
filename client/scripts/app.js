// var $posts = $('.posts')[0];
// var $input = $('.chatInput')[0];

var app = {
  server: "https://api.parse.com/1/classes/messages",
  message: {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
  },
  posts: {
    total: 0
  },
  init: () => app.fetch(),
  send: () => {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: (data) => {
        console.log('chatterbox: Message sent');
      },
      error: () => {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: () => {
    $.get(app.server, {}, (data) => {
      for (let post of data.results) {
        var encodedId = (post.objectId);
        if (app.posts.total[encodedId] === undefined) {
          app.posts.total++;
          app.posts.total[encodedId] = true; 
          app.createPost(post);
        }
      }    
    });
  },
  createPost: (postData) => {
  var $framePost = $('<div class= "post" ' + app.posts.total + '></div>');
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

  },
};

setInterval(() => app.fetch(), 100);  

// var message = {
//   username: '<script>alert("lololol")</script>',
//   text: '',
//   roomname: 'lobby'
// };

// var newPosts = {
//   total: 0
// };

// var updatePosts = function() {
//   $.get('https://api.parse.com/1/classes/messages', {}, function(data) {

//     for (let post of data.results) {
//       var encodedId = (post.objectId);
//       if (!newPosts[encodedId]) {
//         newPosts.total++;
//         newPosts[encodedId] = true; 
//         createPost(post);
//       }
//     }    
//   });
    
// };
// var createPost = function(postData) {
//   var $framePost = $('<div class= "post" ' + newPosts.total + '></div>');
//   var $username = $('<div class="username"></div>');
//   var $text = $('<div class="text"></div>');
//   var $time = $('<div class="time"></div');

//   $framePost.append($username);
//   $framePost.append($text);
//   $framePost.append($time);
//   $('.posts').append($framePost);

//   $username.text(postData.username);
//   $text.text(postData.text);
//   $time.text(postData.createdAt);

// };

// $('.submitBtn').click(function() {
//   var textMessage = $input.value;
//   message.text = textMessage;

//   $.ajax({
//     url: 'https://api.parse.com/1/classes/messages',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });
  
//   $input.value = '';  

// });


