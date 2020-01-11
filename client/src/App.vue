<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
    <portfolio-total :shares="shares"></portfolio-total>
    <share-list :shares="shares"/>
  </div>
</template>

<script>

import SharesService from "./services/ShareService.js"
import portfolioTotal from "@/components/portfolioTotal"
import shareList from "./components/shareList"


export default {
  name: 'app',
  data(){
    return {
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
      quantity: 20,
      price: 20
    }],
      temp: null
    }
  },
  components: {
    'portfolio-total': portfolioTotal,
    'share-list' : shareList
  },
  mounted(){
    SharesService.getShares()
    .then(data => {
      this.shares = data;
      // debugger;
    })
   }
//,
//
//   methods: {
//
//   },
//
//   components: {
//
//   }
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
