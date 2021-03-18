const { io } = require('../index')
const Band = require('../models/band')
const Bands = require('../models/bands')

const bands = new Bands()

bands.addband(new Band('Chipote'))
bands.addband(new Band('Jean Carlos'))
bands.addband(new Band('La Fiesta'))
bands.addband(new Band('Trula'))

// MENSAJES DE SOCKETS
io.on('connection', client => {
  console.log('Cliente Conectado')

  client.emit('active-bands', bands.getBands())
  client.on('disconnect', () => {
    console.log('Cliente desconectado')
  })

  client.on('mensaje', payload => {
    console.log('Mensaje!!', payload)

    io.emit('mensaje', { admin: 'Nuevo Mensaje' })
  })

  client.on('nuevo-mensaje', payload => {
    client.broadcast.emit('nuevo-mensaje', payload)
  })

  client.on('new-band', payload => {
    bands.addband(new Band(payload.name))
    io.emit('active-bands', bands.getBands())
  })

  client.on('vote-band', payload => {
    bands.voteBand(payload.id)
    io.emit('active-bands', bands.getBands())
  })

  client.on('delete-band', payload => {
    bands.deleteBand(payload)
    io.emit('active-bands', bands.getBands())
  })
})
