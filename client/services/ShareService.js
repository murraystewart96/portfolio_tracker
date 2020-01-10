const baseURL = "https://www.alphavantage.co/query?function=";
const intraDayQuery = "function=TIME_SERIES_INTRADAY&symbol=";
const intraDayParams = "&interval=1min&outputsize=compact"

const key = "&api_key=QTA1FETX7I0B34WC";

const tickers= ["AAPL","GOOGL","NVDA","AMZN","ATVI","FB","NFLX","SBUX","EXPE","CMCSA"];


export default {
  getShares(){
    let promises = [];
    for(ticker in tickers){
      promise.push(fetch(baseURL + intraDayQuery + ticker + intraDayParams))
    }

    Promise.all(promises);
  }
}
