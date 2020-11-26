const messagingConfig = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')

let calculatorReceiver

async function stop () {
  await calculatorReceiver.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

module.exports = {
  startAgreementChanged: async function (messageAction) {
    calculatorReceiver = new MessageReceiver(messagingConfig.agreementCalculatorSubscription, messageAction)
    await calculatorReceiver.connect()
  }
}
