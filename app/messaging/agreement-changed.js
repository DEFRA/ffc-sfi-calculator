function calcPayment (k, v) {
  const totalArea = Number(v.totalArea)
  // set default value of 100 if area isn't a number
  return Number.isNaN(totalArea) ? 100 : totalArea * v.paymentRate
}

module.exports = async function (msg) {
  const { body, correlationId } = msg
  let totalPayment = 0

  Object.entries(body).forEach(([k, v]) => {
    const payment = calcPayment(k, v)
    body[k].payment = payment
    totalPayment += payment
  })
  body.totalPayment = totalPayment
  await require('./senders').updateAgreement({ body, correlationId })
}
