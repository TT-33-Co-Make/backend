const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const restrict = require('./middleware/restricted')

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const issuesRouter = require('./issues/issues-router')

const server = express()

server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.use('/api', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/issues', restrict, issuesRouter)

server.get('/', (_, res) => {
    res.status(200).json({ api: 'up' })
})

module.exports = server
