/* eslint-env jest */
import Util from '../lib/util'

describe('adapters', () => {
  it('can get symbol pair rate', async () => {
    const data = require('../__mocks__/binance.price.json')
    const exchange = 'binance'
    const from = 'XRP'
    const to = 'ETH'

    const { parse } = require(`../${exchange}`)
    const pair = parse(data)
    const rate = Util.getPairInfo(pair, from, to)

    expect(rate).toMatchObject({
      exchange,
      pair: `${from}_${to}`,
      last: Number(data.price)
    })
  })

  it('can get swapped symbol pair rate', async () => {
    const data = require('../__mocks__/binance.price.json')
    const exchange = 'binance'
    const from = 'XRP'
    const to = 'ETH'

    const { parse } = require(`../${exchange}`)
    const pair = parse(data)
    const rate = Util.getPairInfo(pair, to, from)

    expect(rate).toMatchObject({
      exchange,
      pair: `${to}_${from}`,
      last: 1 / Number(data.price)
    })
  })

  it('will throw error for not exist symbol pair rate', async () => {
    const data = require('../__mocks__/binance.price.json')
    const exchange = 'binance'
    const from = 'OMG'
    const to = 'OMG'

    const { parse } = require(`../${exchange}`)
    const pair = parse(data)
    expect(() => Util.getPairInfo(pair, to, from)).toThrowError('Pair not exist')
  })
})
