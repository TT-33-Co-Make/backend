exports.seed = function(knex) {
  return knex('votes').truncate()
    .then(function () {
      return knex('votes').insert([
        {id: 1, user_id: 1, issue_id: 1, upvote: 1},
        {id: 2, user_id: 2, issue_id: 2, upvote: 1},
        {id: 3, user_id: 1, issue_id: 2, upvote: 1},
        {id: 4, user_id: 1, issue_id: 1},
        {id: 5, user_id: 2, issue_id: 2},
        {id: 6, user_id: 1, issue_id: 2}
      ]);
    });
};