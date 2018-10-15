import axios from 'axios'
import moment from 'moment'
export default {
  install: (Vue, options) => {
    // Oanda API Key, Account #
    const { credentials } = options

    Vue.prototype.$openNewPosition = (pair, units, timeInForce) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://api-fxtrade.oanda.com/v3/accounts/${credentials.acntId}/orders`,
          headers: {
            'Authorization': `Bearer ${credentials.key}`
          },
          data: {
            'order': {
              'units': units,
              'instrument': pair,
              'timeInForce': timeInForce || 'IOC',
              'type': 'MARKET',
              'positionFill': 'DEFAULT'
            }
          }
        })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    Vue.prototype.$getOpenPositions = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `https://api-fxtrade.oanda.com/v3/accounts/${credentials.acntId}/openPositions`,
          headers: {
            'Authorization': `Bearer ${credentials.key}`
          }
        })
          .then((res) => {
            var data = res.data.positions
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    Vue.prototype.$accountBalance = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `https://api-fxtrade.oanda.com/v3/accounts/${credentials.acntId}/summary`,
          headers: {
            'Authorization': `Bearer ${credentials.key}`
          }
        })
          .then((res) => {
            var data = {
              balance: res.data.account.balance
            }
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    Vue.prototype.$getLatestPrice = (pair) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `https://api-fxtrade.oanda.com/v3/accounts/${credentials.acntId}/pricing?instruments=${pair}`,
          headers: {
            'Authorization': `Bearer ${credentials.key}`
          }
        })
          .then((res) => {
            let data = {
              lastBid: res.data.prices[0].bids[0].price,
              lastAsk: res.data.prices[0].asks[0].price,
              recordedAt: moment().format()
            }
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    Vue.prototype.$getCandlesticks = (pair, from, to, granularity) => {
      return new Promise((resolve, reject) => {
        let dateFrom = moment().subtract(from, 'days').unix()
        let dateTo = moment().subtract(to, 'days').unix()
        let address = `https://api-fxtrade.oanda.com/v3/instruments/${pair}/candles?&price=BA&from=${dateFrom}&to=${dateTo}&granularity=${granularity}`

        axios({
          method: 'get',
          url: address,
          headers: {
            'Authorization': `Bearer ${credentials.key}`
          }
        })
          .then((res) => {
            const data = {
              candles: res.data.candles
            }
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    Vue.prototype.$myAccounts = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'https://api-fxtrade.oanda.com/v3/accounts',
          headers: {
            'Authorization': `Bearer ${credentials.key}`
          }
        })
        .then((res) => {
          const data = {
            accounts: res.data.accounts
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
}
