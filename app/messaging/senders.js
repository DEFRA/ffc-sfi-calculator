const msgCfg = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

let agreementSender

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
    agreementSender = new MessageSender(msgCfg.updateAgreementQueue)
    await agreementSender.connect()
    const msg = createMsg(agreementData)
    console.log('sending message', msg)
    await agreementSender.sendMessage(msg)
    await agreementSender.closeConnection()
  }
}
