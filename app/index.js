const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  const messageAction = function (message) {
    console.log(message.body)
  }

  require('./messaging/receivers').startAgreementChanged(messageAction)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
