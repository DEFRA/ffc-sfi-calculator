const mee = require('math-expression-evaluator')

function calcPayment (k, v) {
  let exp = v.expression
  console.log(`Calculation expression for '${k}', '${exp}'`)
  const tokens = exp.split(' ')

  tokens.forEach(token => {
    const val = v[token]
    if (val) {
      exp = exp.replace(token, Number(val))
    }
  })

  let result = 0
  try {
    result = mee.eval(exp)
  } catch (err) {
    console.error(`Error generated during evaluation of expression: '${exp}'. Are all variables resolvable? Returning default value of 0.`, err)
  }
  return result
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
