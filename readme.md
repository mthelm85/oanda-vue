# oanda-vue

oanda-vue is an Oanda API wrapper that allows you to easily call the Oanda API from your Vue app.

## Installation

`npm i --save oanda-vue`

## Usage

You must have/create an account with Oanda and sign up for an API key. Make note of your API key and the account ID of the account that you want to trade with.

In your main.js file:

```javascript
import Oanda from 'oanda-vue'

Vue.use(Oanda, {
  credentials: {
    key: creds.key, // Your Oanda API key
    acntId: creds.acntId // Your Oanda account ID
  }
})
```
Then, from within your components you can call the API as follows:

```javascript
this.$myAccounts()
this.$getCandlesticks('EUR_USD', 13, 0, 'M4')

// A more realistic example:

methods: {
  async getCandles () {
    let res = await this.$getCandlesticks('EUR_USD', 13, 0, 'M4')
    // plot the returned data on a graph...
  }
}
```

## Available Methods
##### Get a list of your accounts:
```javascript
this.$myAccounts()

// Example response:

accounts: Array(2)
  0: {id: "999-999-9999999-999", mt4AccountID: 1234567, tags: Array(1)}
  1: {id: "999-999-9999999-998", tags: Array(0)}

```

##### Get candlestick data:

```javascript
this.$getCandlesticks('currency_pair', from, to, 'granularity')

// With actual arguments:

this.$getCandlesticks('EUR_USD', 10, 0, 'D')

// Example response:

candles: Array(8)
  0: {complete: true, volume: 135477, time: "2018-09-30T21:00:00.000000000Z", bid: {…}, ask: {…}}
  1: {complete: true, volume: 152349, time: "2018-10-01T21:00:00.000000000Z", bid: {…}, ask: {…}}
  2: {complete: true, volume: 184437, time: "2018-10-02T21:00:00.000000000Z", bid: {…}, ask: {…}}
  ...
```

The first argument *currency_pair* should be expressed as a string in the following format: 'CUR1_CUR2'. For example, 'EUR_USD', or 'EUR_GBP'.

The next two arguments define the period that the candlestick data should cover. Both *from* and *to* are integers and they represent the number of days to subtract from today. For example, if you want candlestick data covering the past week, *from* would be 7 and *to* would be 0.

The last argument *granularity* determines the period that each individual candlestick should cover. It should be expressed as a string and available options are at http://developer.oanda.com/rest-live-v20/instrument-df/.

The example above will retrieve full day candlesticks for the past 10 days.

##### Get the latest ask/bid prices:

```javascript
this.$getLatestPrice('currency_pair')

// Example response for 'EUR_USD':

{lastBid: "1.15275", lastAsk: "1.15287", recordedAt: "2018-10-10T13:43:29-05:00"}
```

##### Get account balance:

```javascript
this.$accountBalance()

// Example response:

{balance: "0.0085"}
```

##### Get open positions:

```javascript
this.$getOpenPositions()
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
