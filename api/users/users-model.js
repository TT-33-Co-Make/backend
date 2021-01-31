const db = require('../../data/dbConfig')


module.exports = {
  get,
  getBy,
  getById,
  add,

}

function get() {
    return db('users')
}

function getBy(filter) {
    return db('users').where(filter).orderBy('id')
}

function getById(id) {
    return db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first()
}

async function add(newUser) {
    const [id] = await db('users').insert(newUser, 'id')
    return getById(id)
}