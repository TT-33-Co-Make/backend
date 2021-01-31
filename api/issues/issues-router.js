const router = require('express').Router()
const Issues = require('./issues-model')
const { validateIssueId } = require('../middleware/issues-middleware')

// GET - find all submitted issues
router.get('/', (req, res) => {
    Issues.getAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: 'unable to retrieve issues' })
        })
})

// GET - find issue by issue id
router.get('/:id', validateIssueId, async (req, res) => {
  res.status(200).json(req.issue)
})




module.exports = router