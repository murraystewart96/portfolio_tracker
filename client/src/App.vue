<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
    <portfolio-total :shares="shares"></portfolio-total>
    <share-list :shares="shares"/>
    <share-card :shares="shares" />
  </div>
</template>

<script>
import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
import shareList from  "./components/shareList"
import ShareCard from './components/ShareCard'


export default {
  name: 'app',
  data(){
    return {
      shares: [{
      _id: "5e199937dc3127e9ea7607ae",
      ticker: "AAPL",
      name: "Apple Inc.",
      exchange: "NASDAQ",
      quantity: 30
    },
    {
      _id: "5e199985dc3127e9ea7607af",
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      exchange: "NASDAQ",
      quantity: 20
    },
    {
      _id: "5e1999bbdc3127e9ea7607b0",
      ticker: "ATVI",
      name: "Activision Blizzard Inc.",
      exchange: "NASDAQ",
      quantity: "50"
    },
    {
      _id: "5e1999eadc3127e9ea7607b1",
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      exchange: "NASDAQ",
      quantity: 40
    },
    {
      _id: "5e199a15dc3127e9ea7607b2",
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      exchange: "NASDAQ",
      quantity: 40
    }],


    }
  },
  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList,
    'share-card': ShareCard
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
