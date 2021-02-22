const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')
const { log } = require('../services/logger')

const agreementSender = new MessageSender(msgCfg.updateAgreementQueue)

const createMsg = (agreementData) => {
  const msgBase = {
    type: msgCfg.updateAgreementMsgType,
    source: msgCfg.msgSrc
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
    const msg = createMsg(agreementData)
    log('sending message', msg)
    await agreementSender.sendMessage(msg)
  }
}
