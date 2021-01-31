const Issues = require('../issues/issues-model')

const validateIssueId = async (req, res, next) => {
    const { id } = req.params
    try {
        const issue = await Actions.get(id)
        if(!issue) {
            res.status(404).json({ message: `issue ${id} not found` })
        } else {
            req.issue = issue
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'there was an error validating the id',
            error: err
        })
    }
}

const validateInputs = (req, res, next) => {
    if (!req.body.title || !req.body.description) {
      res.status(401).json({ message: 'provide a title and description' });
    } else {
      next();
    }
}

const validateChanges = (req, res, next) => {
    if (!req.body) {
      res.status(401).json({ message: 'provide edits to title and description' });
    } else {
      next();
    }
}

validateEditPermissions = 

module.exports = { validateIssueId, validateInputs, validateChanges }