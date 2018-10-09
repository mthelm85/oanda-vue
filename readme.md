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

## Available Calls
Get a list of accounts:
```javascript
this.$myAccounts()

// Example response:

[ { id: '201-011-3095092-005',
    mt4AccountID: 1453427,
    tags: [ 'MT4' ] },
  { id: '201-011-3095092-006', tags: [] } ]
```

Get candlestick data:

```javascript
this.$getCandlesticks(currency_pair, from, to, granularity)

// With actual arguments:

this.$getCandlesticks('EUR_USD', 7, 0, 'M4')

// Example response:

[ { id: '201-011-3095092-005',
    mt4AccountID: 1453427,
    tags: [ 'MT4' ] },
  { id: '201-011-3095092-006', tags: [] } ]
```

The first argument, *currency_pair*, should be expressed as a string in the following format: 'CUR1_CUR2'. For example, 'EUR_USD', or 'EUR_GBP'.

The next two arguments define the period that the candlestick data should cover. Both *from* and *to* are integers and they represent the number of days to subtract from today. For example, if you want candlestick data covering the past week, *from* would be 7 and *to* would be 0.

The last argument, *granularity*, determines the period that each individual candlestick should cover. It should be expressed as a string and available options are at http://developer.oanda.com/rest-live-v20/instrument-df/.

The example above will retrieve 4-minute candlesticks for the past 7 days.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
