const server = require('./server')
const { log, logError } = require('./services/logger')

const init = async () => {
  const agreementChangedAction = require('./messaging/determine-agreement-version')
  require('./messaging/receivers').startAgreementChanged(agreementChangedAction)

  await server.start()
  log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  logError(err)
  process.exit(1)
})

init()
