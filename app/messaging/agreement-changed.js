function resolveExpression (standard, exp) {
  return exp.split(' ').reduce((acc, cur) => {
    const val = standard[cur]
    return val ? acc.replace(cur, Number(val)) : acc
  }, exp)
}

function evalExpression (exp) {
  let result = 0
  try {
    result = eval(exp)
  } catch (err) {
    console.error(`Error generated during evaluation of expression: '${exp}'. Have all variables been resolved? Returning default value of 0.`, err)
  }
  return result
}

function selectExpression (standard) {
  const calcs = standard.calculation
  for (let i = 0; i < calcs.length; i++) {
    const conditionExp = resolveExpression(standard, calcs[i].condition)
    const conditionResult = evalExpression(conditionExp)
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
  const expForEval = resolveExpression(standard, exp)

  return evalExpression(expForEval)
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
