const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { checking } = require('./route/checking')

const PORT = 4000
const server = express()

server.use('*', cors({ origin: 'http://localhost:3000' }))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/checking', checking)

server.listen(PORT, () =>
  console.log(`Server is now running on http://localhost:${PORT}`)
)

module.exports = server
