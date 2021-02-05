const db = require('../../data/dbConfig');

function getIssuesVotes(id) {
    return db('votes as v')
    .where('v.issue_id', id)
    .sum('v.upvote as upvote_total')
    .sum('v.downvote as downvote_total')
    .join('issues as i', 'v.issue_id', 'i.id')
    .select('v.issue_id', 'i.title')
}

function addVote(vote) {
    return db('votes').insert(vote)
}

module.exports = {
    getIssuesVotes,
    addVote
}