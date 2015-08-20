var $ = require('jquery-browserify'),
    API = require('../utils/api');

module.exports = function() {
  
  var $graph = $('.vote-graph'),
      $lis = $graph.find('li'),
      
      count = 0,
      votes = {};
  
  API.on(API.vote, API.vote.received_votes, function(vote_data) {
    count = vote_data.count;
    votes = vote_data.votes;
    
    updateVotes();
  });

  API.send(API.vote, API.vote.get_votes, "");
  
  function updateVotes() {
    $graph.toggleClass('is-visible', count > 0);
    
    for (var vote_id in votes)
      $('#vote-' + vote_id + ' i').css('height', ((votes[vote_id] / count) * 100) + '%');
  };
};
