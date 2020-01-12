<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
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
      shares: [],
      temp: null

    }
  },

  mounted(){


    // SharesService.getShares()
    // .then(data => {
    //   this.shares = data;
    //   SharesService.updateSharePrices(this.shares);
    // })

    // SharesService.getPricesDaily("AAPL")
    // .then(prices => console.log( prices));
    //
    // SharesService.getPricesIntraday("AAPL")
    // .then(prices => console.log("Intradaily Prices", prices));

  },

  methods: {

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
