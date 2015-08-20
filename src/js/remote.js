var $ = require('jquery-browserify'),
    API = require('./utils/api');

$('button').on('click', function(e) {
  e.preventDefault();
  
  API.send(API.remote, API.remote.navigation, $(this).data('dir'));
});
