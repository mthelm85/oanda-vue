import axios from 'axios'
import moment from 'moment'
export default {
  install: (Vue, options) => {
    // Oanda API Key, Account #
    const { credentials } = options

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
            accounts: res.data
          }
          resolve(accounts)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
}
