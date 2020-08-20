const config = require('config')
const express = require('express')
const morgan = require('morgan')
const Sequelize = require('sequelize')

const DB_CONFIG = config.get('DB_CONFIG')
const sequelize = new Sequelize({
  ...DB_CONFIG,
  logging: false,
})


const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(morgan(`dev`))

server.use((req, res) => {
  res.status(200).json({
    status: 'I am alive',
  })
})

function start() {
  try {

    sequelize.authenticate()
        .then(console.log('Connection has been established successfully.'))
        .catch(e => console.error('Unable to connect to the database:', e))

    server.listen(PORT, () => {
      console.log(`App started on ${PORT} port`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()