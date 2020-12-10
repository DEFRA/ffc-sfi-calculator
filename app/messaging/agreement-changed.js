module.exports = async function (msg) {
  const { body, correlationId } = msg
  const result = Number(body.value)
  // set default value of 123
  body.result = Number.isNaN(result) ? 123 : result * 10
  await require('./senders').updateAgreement({ body, correlationId })
}
