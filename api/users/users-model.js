const db = require('../../data/dbConfig')

module.exports = {
  getBy,
  getById,
  add,

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