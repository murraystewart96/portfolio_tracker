<template>
  <div id="app">
    <h1 id="title">Portfolio Tracker</h1>

    <div class="portfolio-total">
      <portfolio-total :shares="shares"></portfolio-total>
    </div>

    <div class="share-list">
      <h2>Your current shares</h2>
      <share-list :shares="shares"/>
    </div>

    <div class="share-card">
      <share-card :share="selectedShare" v-if="displayShareCard" />
    </div>

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

    selectedShare:null,
    displayShareCard: false,
    dipslayPieChart: true

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

<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#title {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.share-card{
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  border: solid 3px #39CCCC;
  align-items: baseline;
}

.share-list{
  width: auto;
  position: fixed;
  top: 20px;
  left: 10px;
  background: #eee;
  overflow-x: hidden;
  padding: 8px 0;
  margin-top: 5px;
  border: solid 3px #39CCCC;
  padding: 10px;
}

.share-list button{
  display: flex;
  font-size: 17px;
  justify-content: space-around;
}

.portfolio-total{
  justify-content: space-between;
  border: solid 3px #39CCCC;
  width: auto;
  position: absolute;
  top: 30px;
  right: 40px;
  background: #eee;
  padding: 10px;
}


</style>
