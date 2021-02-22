const v1 = require('./agreement-changed-v1')
const v2 = require('./agreement-changed-v2')
const { log } = require('../services/logger')

module.exports = async function (msg, calculatorReceiver) {
  // NOTE: not particularly robust for determining version but ok for now

  console.log('GOT MESSAGE!')

  if (msg.body.calculations) {
    log('v1 msg found')
    await v1(msg, calculatorReceiver)
  } else {
    log('v2 msg found')
    await v2(msg, calculatorReceiver)
  }
}
