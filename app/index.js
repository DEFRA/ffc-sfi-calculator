const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  require('./messaging/update-agreement').publish({ test: 'test from calculator' })
  require('./messaging/agreement-calculator').create()
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
