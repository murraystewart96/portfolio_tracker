<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
    <!-- <portfolio-total :shares="shares"/>
    <share-list :shares="shares"/> -->
  </div>
</template>

<script>

import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
import shareList from  "./components/shareList"


export default {
  name: 'app',
  data(){
    return {
<<<<<<< HEAD
      shares: [{
      _id: "5e199937dc3127e9ea7607ae",
      ticker: "AAPL",
      name: "Apple Inc.",
      exchange: "NASDAQ",
      quantity: 30,
      price: 10
    },
    {
      _id: "5e199985dc3127e9ea7607af",
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      exchange: "NASDAQ",
      quantity: 200,
      price: 30
    }]
=======
      shares: [],
      temp: null
>>>>>>> develop

    }
  },
  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList

  },
  mounted(){


    // SharesService.getShares()
    // .then(data => {
    //   this.shares = data;
    //   SharesService.updateSharePrices(this.shares);
    // })

    SharesService.getPricesDaily("AAPL")
    .then(prices => console.log(, prices));

    SharesService.getPricesIntraday("AAPL")
    .then(prices => console.log("Intradaily Prices", prices));

  },

  methods: {



  },

  components: {

  }
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
