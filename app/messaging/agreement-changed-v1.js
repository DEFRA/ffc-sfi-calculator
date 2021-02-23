const { calculatePayment } = require('../services/payment-calculator')
const { updateAgreement } = require('./senders')
const { logError } = require('../services/logger')

module.exports = async function (msg, calculatorReceiver) {
  try {
    const { body, correlationId } = msg
    const { standards } = body

    Object.entries(standards).forEach(([id, standard]) => {
      const payment = calculatePayment(standard)
      standards[id].payment = payment
    })

    const totalPayment = calculatePayment(body)

    body.totalPayment = totalPayment
    await updateAgreement({ body, correlationId })

    await calculatorReceiver.completeMessage(msg)
  } catch (err) {
    logError(err, 'Unable to process agreement changed v1 message')
    await calculatorReceiver.abandonMessage(msg)
  }
}
