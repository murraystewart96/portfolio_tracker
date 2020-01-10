const baseURL = "https://www.alphavantage.co/query?function=";
const intraDayQuery = "function=TIME_SERIES_INTRADAY&symbol=";
const intraDayParams = "&interval=1min&outputsize=compact"

const key = "&api_key=QTA1FETX7I0B34WC";


const tickers = ["AAPL","GOOGL","NVDA","AMZN","ATVI"]//,"FB","NFLX","SBUX","EXPE","CMCSA"];

const createShares = function(ticker_p, price_p, quantity_p){
  return {
    ticker: ticker_p,
    exchange: "NASDAQ",
    price: price_p,
    quantity: quantity_p
  }
}

export default {
  getShares(){
    let fetchPromises = [];
    let responsePromises = [];

    for(let i = 0; i < tickers.length; i++){
      //fetchPromises.push(fetch(baseURL + intraDayQuery + tickers[i] + intraDayParams))
      fetchPromises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickers[i]}&interval=1min&outputsize=compact&${key2}`));
    }

    return Promise.all(fetchPromises) //once the fetch requests have resolved
    .then((docs) => {
      docs.forEach((doc) => {
        responsePromises.push(doc.json()); //push each response
      })
    })
    .then(() => {
      return Promise.all(responsePromises)
      .then((docs) => {

        let shares = [];

        docs.forEach((doc) => {
          const timestamp = doc["Meta Data"]["3. Last Refreshed"];
          const ticker = doc["Meta Data"]["2. Symbol"];
          const price = doc["Time Series (1min)"][timestamp]["4. close"];
          shares.push(createShares(ticker, price, 30));
        })
        return shares;
      });
    })

  }
  getTotalValue(shares){
    let total = 0;

    for (share in shares){
      value = share.price * share.quantity;
      total += value
    };
    return total;
  }
}




// {
// "Meta Data": {
// "1. Information": "Intraday (5min) open, high, low, close prices and volume",
// "2. Symbol": "SBUX",
// "3. Last Refreshed": "2020-01-10 11:10:00",
// "4. Interval": "5min",
// "5. Output Size": "Compact",
// "6. Time Zone": "US/Eastern"
// },
// "Time Series (5min)": {
// "2020-01-10 11:10:00": {
// "1. open": "90.0500",
// "2. high": "90.1000",
// "3. low": "90.0449",
// "4. close": "90.0700",
// "5. volume": "60985"
// },
