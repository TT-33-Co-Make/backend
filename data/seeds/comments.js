exports.seed = function(knex) {
  return knex('comments').truncate()
    .then(function () {
      return knex('comments').insert([
        {id: 1, comment: 'Racoons are a horrible idea! Fix the roads!!!', user_id: 1, issue_id: 2},
        {id: 2, comment: 'Racoons are a better idea than your stupid boring roads! Who cares about roads? Everybody loves fluffy trash pandas.', user_id: 3, issue_id: 1},
        {id: 3, comment: 'Roads are useful! We need roads! What is wrong with you?', user_id: 1, issue_id: 2}
      ]);
    });
};