const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  useCredentialChain: process.env.NODE_ENV === 'production'
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
  updateAgreementMsgType: 'uk.gov.ffc.sfi.agreement.update',
  msgSrc: 'ffc-sfi-calculator'
}
