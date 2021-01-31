const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getBy,
    getById,
    add,
    update,
    remove
}

function getAll(){
    return db('issues as i')
      .join('users as u', 'i.user_id', 'u.id')
      .select('i.*', 'u.username')
      .orderBy('id');
}

function getBy(filter) {
    return db('issues as i')
      .where('i.user_id', 'like', filter).first()
      .join('users as u', 'i.user_id', 'u.id')
      .select('i.*', 'u.username');
}

function getById(id) {
    return db('issues as i')
      .where('i.id', 'like', id).first()
      .join('users as u', 'i.user_id', 'u.id')
      .select('i.*', 'u.username');
}

async function add(issue) {
    const id = await db('issues').insert(issue);
    return await getById(id);
}
  
async function update(id, info) {
    return await getById(id).update(info);
}
  
async function remove(id) {
    return await getById(id).del();
  }