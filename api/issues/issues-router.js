const router = require('express').Router()
const Issues = require('./issues-model')
const { validateIssueId, validateInputs, validateChanges, userPermissions } = require('../middleware/issues-middleware')

// GET - find all submitted issues ---WORKING
router.get('/', (req, res) => {
    Issues.getAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: 'unable to retrieve issues' })
        })
})

// GET - find issue by issue id ---WORKING
router.get('/:id', validateIssueId, async (req, res) => {
  res.status(200).json(req.issue)
})

// POST - add a new issue ---WORKING
router.post('/', validateInputs, async (req, res) => {
    const issue = req.body
    req.body.user_id = req.decodedJwt.subject
    try {
      const newIssue = await Issues.add(issue)
      res.status(201).json(newIssue)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// PUT - updates an issue based on id ---WORKING
router.put('/:id', validateChanges, userPermissions, async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
      await Issues.update(id, data)
      const updatedIssue = await Issues.getById(id)
      res.status(200).json(updatedIssue);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// DELETE - delete an issue based on id ---WORKING
router.delete('/:id', userPermissions, async (req, res) => {
    const { id } = req.params
    try {
      await Issues.remove(id)
      res.status(200).json({ message: `Issue #${id} has been deleted` })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })




module.exports = router