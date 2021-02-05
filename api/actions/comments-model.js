const db = require('../../data/dbConfig')

function getComments(id) {
    return db('comments as c')
    .where('c.issue_id', id)
    .join('issues as i', 'c.issue_id', 'i.id')
    .join('users as u', 'c.user_id', 'u.id')
    .select('c.comment', 'c.id', 'i.title', 'u.username')
}

function addComment(comment) {
    return db('comments').insert(comment)
}

function remove(id) {
    return db('comments').where('id', id).del()
}

module.exports = {
    getComments,
    addComment,
    remove
}