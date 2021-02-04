const db = require('../../data/dbConfig');

function getIssuesVotes(id) {
    return db('votes as v')
    .where
}

function addVote(vote) {
    return db('votes').insert(vote)
}

module.exports = {
    getIssuesVotes,
    addVote
}