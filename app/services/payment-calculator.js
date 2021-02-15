const { eval: eeval, parse } = require('expression-eval')
const { log, logError } = require('../services/logger')

function evalExpression (ctx, exp) {
  let result = 0
  try {
    const ast = parse(exp)
    result = eeval(ast, ctx)
  } catch (err) {
    logError(err, `Error generated during evaluation of expression: '${exp}'. Have all variables been resolved? Returning default value of 0.`)
  }
  return result
}

function selectExpression (ctx) {
  const calcs = ctx.calculations
  for (let i = 0; i < calcs.length; i++) {
    const conditionExp = calcs[i].condition
    let conditionResult
    if (conditionExp) {
      conditionResult = evalExpression(ctx, conditionExp)
    }
    if (conditionResult || !conditionExp) {
      return calcs[i].expression
    }
  }
  throw new Error('No conditions were matched to provide an expression. Check the coverage of the conditions.')
}

/**
 * @param {Object} ctx - An object with an `id` prop and a `calculations` prop
 * that is itself an array of objects containing two properties, both strings.
 * `condition` - used to determine if it will be used
 * `expression`- an expression that will be evaluated by `expression-eval`, if
 * the condition is true
 */
function calculatePayment (ctx) {
  const exp = selectExpression(ctx)
  log(`Calculation expression used for '${ctx.id}' - '${exp}'`)
  return evalExpression(ctx, exp)
}

module.exports = {
  calculatePayment
}
