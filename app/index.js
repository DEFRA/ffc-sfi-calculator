const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  await require('./messaging/agreement-calculator').create()
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
