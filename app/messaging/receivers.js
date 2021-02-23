const msgCfg = require('../config/messaging')
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
  startAgreementChanged: async function (agreementChanged) {
    const updateAction = msg => agreementChanged(msg, calculatorReceiver)
    calculatorReceiver = new MessageReceiver(msgCfg.agreementCalculatorSubscription, updateAction)
    await calculatorReceiver.subscribe()
  }
}
