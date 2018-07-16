import moment from 'moment'

const crowdsale = {
  blocks: {
    0: 5933210,
    1: 6953260,
    2: 6963270,
    3: 6973280,
  },
  phases: {
    // utc + 2 = CEST
    0: moment('2018-12-10T14:01Z'), // countdown phase
    1: moment('2018-12-11T14:02Z'), // phase 1
    2: moment('2018-12-12T14:03Z'), // phase 2
    3: moment('2018-12-13T14:04Z'), // phase 3
  },
  caps: {
    min: 0,
    max: 62500,
    successCap: 9375,
    phaseOneCap: 62500 / 100 * 50,
  },
  eth: {
    ico: '0x9B60874D7bc4e4fBDd162e0F5a12002e4F7715a6',
    sig: '0x02dc3b8ab87c562cdce707647bd1ba21c390faf4',
  },
  etherscanApiKey: '', // your etherscan API key
  googleAnalyticsApiKey: '', // your google analytics API key
}

export default crowdsale
