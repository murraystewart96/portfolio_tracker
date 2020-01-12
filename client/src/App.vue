<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
    <p>{{this.shareValues}}</p>
    <portfolio-total :shares="shares"/>
    <share-list :shares="shares"/>
    <share-chart/>
  </div>
</template>

<script>

import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
import shareList from  "./components/shareList"
import pricesChart from "./components/myShareChart"

export default {
  name: 'app',
  data(){
    return {
      shares: [  {
        _id: "5e199937dc3127e9ea7607ae",
        ticker: "AAPL",
        name: "Apple Inc.",
        exchange: "NASDAQ",
        price: 10,
        quantity: 30
      },
      {
        _id: "5e199985dc3127e9ea7607af",
        ticker: "GOOGL",
        name: "Alphabet Inc.",
        exchange: "NASDAQ",
        price: 20,
        quantity: 20
      }],
      temp: null,
      shareValues: []

    }
  },

  mounted(){


    SharesService.getShares()
    .then(data => {
      this.shares = data;
      console.log(data);
      SharesService.updateSharePrices(this.shares);
    })

    // SharesService.getPricesDaily("AAPL")
    // .then(prices => console.log( prices));
    //
    // SharesService.getPricesIntraday("AAPL")
    // .then(prices => console.log("Intradaily Prices", prices));

    this.getShareValues()

  },

  methods: {
    getShareValues(){
      this.shares.map(share => {
        let res = (share.quantity * (parseInt(share.price)))
          this.shareValues.push(res);
      });
    }
  },

  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList,
    'share-chart': pricesChart
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
