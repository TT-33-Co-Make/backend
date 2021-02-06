
exports.seed = function(knex, Promise) {
  return knex('users').insert([   
    { id: 1, username: 'oscar', email: 'oscar@oscar.com',  password: '12345' },
    { id: 2, username: 'peter', email: 'peter@peter.com',  password: '12345' },
  ])
}