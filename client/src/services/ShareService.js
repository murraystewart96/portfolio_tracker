const baseURLint = "http://localhost:3000/api/shares"
const baseURLext = "https://www.alphavantage.co/query?function=";

const intraDayQuery = "TIME_SERIES_INTRADAY&symbol=";
const intraDayParams1min = "&interval=1min&outputsize=compact"
const intraDayParams60min = "&interval=60min&outputsize=compact"

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
    let fetchPromises = [];
    let responsePromises = [];

    for(let i = 0; i < tickers.length; i++){
      fetchPromises.push(fetch(baseURLext + intraDayQuery + tickers[i] + intraDayParams + key2))
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
  },

  getPricesIntraday(ticker){

    const dateObj = new Date();

    const year = dateObj.getFullYear();
    let month = parseInt(dateObj.getMonth()) + 1;
    month.toString();
    let day = dateObj.getDate();


    let hour = dateObj.getHours().toString();
    let mins = dateObj.getMinutes().toString();
    const secs = ":00";

    if(month < 10){
      month = '0' + month;
    }

    if(day < 10){
      day = '0' + day;
    }

    const date = year + '-' + (month) + '-' + day;
    const time = hour + ':' + mins + secs;

    if(hour < 10){
      hour = '0' + hour;
    }

    if(mins < 10){
      mins = '0' + mins;
    }
    console.log(time);

    const currTimestamp = date + " " + time;

    let prices = [];

    fetch(baseURLext + intraDayQuery + ticker + intraDayParams60min + key2)
    .then(doc => doc.json())
    .then((doc) => {
      const latestTimestamp = doc["Meta Data"]["3. Last Refreshed"];
      //const latestTimestamp = "2020-01-10 15:30:00"
      const latestDay = latestTimestamp.slice(8,10)
      const latestHour = latestTimestamp.slice(11,13)
      const sharesData = Object.values(doc["Time Series (60min)"])

      const closingTime = "15:30:00"

      if(day > latestDay){ //if market has not opened today

        for(let i = 0; i < 7; i++){
          prices.push(sharesData[i]["4. close"])
        }

      }else if(time >= closingTime){ //if market has closed for the day
        for(let i = 0; i < 7; i++){
          prices.push(sharesData[i]["4. close"])
        }
      }else if(time < closingTime){ //if market is open

        const priceIntervals = latestHour - 8;

        for(let i = 0; i < priceIntervals; i++){
          prices.push(sharesData[i]["4. close"]);
        }
      }
      console.log(prices);
     })
  }
}
