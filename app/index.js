const server = require('./server')

const init = async () => {
  const agreementChangedAction = require('./messaging/agreement-changed')
  require('./messaging/receivers').startAgreementChanged(agreementChangedAction)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
