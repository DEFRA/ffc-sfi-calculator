const messagingConfig = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

let agreementSender

const createMessage = (agreementData) => {
  const msgBase = {
    type: messagingConfig.updateAgreementMessageType,
    source: messagingConfig.messageSource
  }
  return { ...agreementData, ...msgBase }
}

async function stop () {
  await agreementSender.closeConnection()
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
  updateAgreement: async function (agreementData) {
    agreementSender = new MessageSender(messagingConfig.updateAgreementQueue)
    await agreementSender.connect()
    const msg = createMessage(agreementData)
    console.log('sending message', msg)
    await agreementSender.sendMessage(msg)
    await agreementSender.closeConnection()
  }
}
