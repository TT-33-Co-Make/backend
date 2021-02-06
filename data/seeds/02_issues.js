
exports.seed = function(knex, Promise) {
  return knex('issues').insert([   
    {id: 1, title: 'Snow Removal', description: 'It has snowed several times in the past few weeks, and the city has not plowed side roads at all!', resolved_status: 'unresolved', user_id: 1},
    { id: 2, title: 'Stop for buses!', description: 'Children are trying to cross the street! Please stop for buses!', resolved_status: 'unresolved', user_id: 2},
  ])
}
