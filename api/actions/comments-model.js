const db = require('../../data/dbConfig')

function getComments() {

}

function addComment(comment) {
    return db('comments').insert(comment)
}

module.exports = {
    getComments,
    addComment
}