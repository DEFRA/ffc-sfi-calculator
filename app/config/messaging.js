const sharedConfig = {
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  usePodIdentity: process.env.NODE_ENV === 'production'
}

module.exports = {
  agreementCalculatorSubscription: {
    address: process.env.AGREEMENT_CHANGED_SUBSCRIPTION_ADDRESS,
    topic: process.env.AGREEMENT_CHANGED_TOPIC_ADDRESS,
    type: 'subscription',
    ...sharedConfig
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  updateAgreementMessageType: 'uk.gov.ffc.sfi.agreement.update',
  messageSource: 'ffc-sfi-calculator'
}
