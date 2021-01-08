const { eval: eeval, parse } = require('expression-eval')

function evalExpression (ctx, exp) {
  let result = 0
  try {
    const ast = parse(exp)
    result = eeval(ast, ctx)
  } catch (err) {
    console.error(`Error generated during evaluation of expression: '${exp}' with context: '${JSON.stringify(ctx)}'. Have all variables been resolved? Returning default value of 0.`, err)
  }
  return result
}

function selectExpression (standard) {
  const calcs = standard.calculation
  for (let i = 0; i < calcs.length; i++) {
    const conditionResult = evalExpression(standard, calcs[i].condition)
    if (conditionResult) {
      return calcs[i].expression
    }
  }
  console.error('No conditions were matched to provide an expression. Check the coverage of the conditions. Default expression will be used.')
  return 'userInput * paymentRate'
}

function calcPayment (standard) {
  const exp = selectExpression(standard)
  console.log(`Calculation expression used for '${standard.id}' - '${exp}'`)
  return evalExpression(standard, exp)
}

module.exports = async function (msg) {
  const { body, correlationId } = msg
  let totalPayment = 0

  Object.entries(body).forEach(([id, standard]) => {
    const payment = calcPayment(standard)
    body[id].payment = payment
    totalPayment += payment
  })
  body.totalPayment = totalPayment
  await require('./senders').updateAgreement({ body, correlationId })
}
