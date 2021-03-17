const express = require('express')
const path = require('path')
require('dotenv').config()

// APP EXPRESS
const app = express()

// NODE SERVER
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)

require('./sockets/socket')

// Path publico
const publicPath = path.resolve(__dirname, 'public')

app.use(express.static(publicPath))

server.listen(process.env.PORT, e => {
  if (e) throw new Error(e)

  console.log('Servidor en puerto ', process.env.PORT)
})
