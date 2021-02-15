const { calculatePayment } = require('../services/payment-calculator')
const { updateAgreement } = require('./senders')

module.exports = async function (msg) {
  const { body, correlationId } = msg

  const { standards } = body
  Object.entries(standards).forEach(([id, standard]) => {
    const payment = calculatePayment(standard)
    standards[id].payment = payment
  })

  const totalPayment = calculatePayment(body)

  body.totalPayment = totalPayment
  await updateAgreement({ body, correlationId })
}
