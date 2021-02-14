const { calculatePayment } = require('../services/payment-calculator')

module.exports = async function (msg) {
  const { body, correlationId } = msg

  const { standards } = body
  Object.entries(standards).forEach(([id, standard]) => {
    const payment = calculatePayment(standard)
    standards[id].payment = payment
  })

  const totalPayment = calculatePayment(body)

  body.totalPayment = totalPayment
  await require('./senders').updateAgreement({ body, correlationId })
}
