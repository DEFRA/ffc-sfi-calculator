module.exports = async function (message) {
  const result = Number(message.body.value) * 10.0
  await require('./senders').updateAgreement({ result })
}
