
exports.seed = function(knex, Promise) {
  return knex('users').insert([   
    { username: 'oscar', email: 'oscar@oscar.com',  password: '12345' },
    { username: 'peter', email: 'peter@peter.com',  password: '12345' },
  ])
}