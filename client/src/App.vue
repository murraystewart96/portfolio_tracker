<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
    <portfolio-total :shares="shares"/>
    <share-list :shares="shares"/>
    <!-- <shares-chart v-if="displayPieChart"/> -->
    <share-card :share="selectedShare" v-if="displayShareCard"/>

  </div>
</template>

<script>

import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
import shareList from  "./components/shareList"
import pricesChart from "./components/myShareChart"
import { eventBus } from './main.js';
import shareCard from "./components/ShareCard"


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

      selectedShare: null,
      displayShareCard: false,
      displayPieChart: true

    }
  },

  mounted(){


    // SharesService.getShares()
    // .then(data => {
    //   this.shares = data;
    //   console.log(data);
    //   SharesService.updateSharePrices(this.shares);
    // })

    // SharesService.getPricesDaily("AAPL")
    // .then(prices => console.log( prices));
    //
    // SharesService.getPricesIntraday("AAPL")
    // .then(prices => console.log("Intradaily Prices", prices));
    eventBus.$on("display-share", (share) => {
      this.selectedShare = share;
      this.displayShareCard = true;
      this.displayPieChart = false;
    })

  },

  methods: {

  },

  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList,
    'shares-chart': pricesChart,
    'share-card' : shareCard

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
