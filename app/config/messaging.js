const sharedConfig = {
  host: process.env.MESSAGE_QUEUE_HOST,
  password: process.env.MESSAGE_QUEUE_PASSWORD,
  username: process.env.MESSAGE_QUEUE_USER,
  usePodIdentity: process.env.NODE_ENV === 'production'
}

module.exports = {
  agreementCalculatorSubscription: {
    address: process.env.AGREEMENT_CALCULATOR_SUBSCRIPTION_ADDRESS,
    topic: process.env.AGREEMENT_CHANGED_TOPIC_ADDRESS,
    type: 'subscription',
    ...sharedConfig
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  messageTypePrefix: 'uk.gov.ffc.sfi',
  messageSource: 'ffc-sfi-calculator'
}
