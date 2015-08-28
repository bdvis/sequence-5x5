require('./utils/action-handler')(true);

var API = require('./utils/api');

API.on(API.vote, API.vote.showed_vote, function(votes) {
  $(votes.length? '#' + votes.join(',#') : '[data-role]').toggleClass('is-visible', votes.length !== 0);
  $('ul,.msg').toggleClass('is-shifted', votes.length !== 0);
});

API.send(API.vote, API.vote.get_shown_votes, '');
