const baseURLint = "http://localhost:3000/api/shares"
const baseURLext = "https://www.alphavantage.co/query?function=";

const intraDayQuery = "TIME_SERIES_INTRADAY&symbol=";
const intraDayParams = "&interval=1min&outputsize=compact"

const key1 = "&apikey=QTA1FETX7I0B34WC";
const key2 = "&apikey=FT7FZ6ZFM0DJ6CZT";


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
    return fetch(baseURLint => {

    })
  }

  getShares(){
    let fetchPromises = [];
    let responsePromises = [];

    for(let i = 0; i < tickers.length; i++){
      fetchPromises.push(fetch(baseURLext + intraDayQuery + tickers[i] + intraDayParams + key2))
      //fetchPromises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickers[i]}&interval=1min&outputsize=compact&${key2}`));
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
        console.log(docs); //hdhshsdhshsh
        docs.forEach((doc) => {
          const timestamp = doc["Meta Data"]["3. Last Refreshed"];
          const ticker = doc["Meta Data"]["2. Symbol"];
          const price = doc["Time Series (1min)"][timestamp]["4. close"];
          shares.push(createShares(ticker, price, 30));
        })
        return shares;
      });
    })
},

  getTotalValue(shares){
    let total = 0;

    for (share in shares){
      let value = share.price * share.quantity;
      total += value;
    };
    return total;
  },

  postShares(payload){
    fetch(baseURLint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json());
  }
}
