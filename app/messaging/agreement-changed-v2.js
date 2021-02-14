const { calculatePayment } = require('../services/payment-calculator')

module.exports = async function (msg) {
  const { body, correlationId } = msg

  const { standards } = body
  Object.entries(standards).forEach(([id, standard]) => {
    const payment = calculatePayment(standard)
    if (!isNaN(payment)) {
      standards[id].payment = payment
    }
    standards[id].optionalActions.forEach(a => {
      const payment = calculatePayment(a)
      if (!isNaN(payment)) {
        a.payment = payment
      }
    })
  })

  const selectedStandards = Object.values(standards).filter(s => s.selected)
  const standardsPayment = selectedStandards.reduce((acc, cur) => { acc += cur.payment; return acc }, 0)
  const actionsPayment = selectedStandards.reduce((acc, cur) => { acc += cur.optionalActions.reduce((aacc, acur) => { aacc += acur.payment; return aacc }, 0); return acc }, 0)

  body.payments = {
    actionsPayment,
    standardsPayment,
    totalPayment: actionsPayment + standardsPayment
  }
  console.log(JSON.stringify(body, null, 2))
  await require('./senders').updateAgreement({ body, correlationId })
}