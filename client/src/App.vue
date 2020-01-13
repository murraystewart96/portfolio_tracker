<template>
  <div id="app">

  <div class="title">
    <h1 id="title">Portfolio Tracker</h1>
    <img src="@/assets/growth-icon2.png" alt="">
  </div>

    <div class="main-content">

      <div class="share-list">
          <h2>Your current shares</h2>
          <share-list :shares="shares"/>
      </div>

      <div class="share-card">
        <portfolio-pie-chart v-if="displayPieChart" :chartInfo="pieChartInfo" type="pie"/>
        <share-card v-else-if="displayShareCard" :share="selectedShare"/>
      </div>

      <div class="portfolio-total">
        <portfolio-total :shares="shares"></portfolio-total>
      </div>

    <div class="share-card">
      <portfolio-info :shares="shares" :destroy="destroyPieChart"/>
      <share-card v-if="displayShareCard" :share="selectedShare"/>
    </div>
        </div>
  </div>

</template>

<script>
import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
import Portfolio from "./components/portfolio"
import shareList from  "./components/shareList"
import Chart from "./components/myShareChart"
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
      price: 10,
      quantity: 30
    },
    {
      _id: "5e199985dc3127e9ea7607af",
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      exchange: "NASDAQ",
      price: 30,
      quantity: 20
    },
    {
      _id: "5e1999bbdc3127e9ea7607b0",
      ticker: "ATVI",
      name: "Activision Blizzard Inc.",
      exchange: "NASDAQ",
      price: 40,
      quantity: 50
    },
    {
      _id: "5e1999eadc3127e9ea7607b1",
      ticker: "AMZN",
      name: "Amazon.com Inc.",
      exchange: "NASDAQ",
      price: 100,
      quantity: 40
    },
    {
      _id: "5e199a15dc3127e9ea7607b2",
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      exchange: "NASDAQ",
      price: 20,
      quantity: 40
    }],

      selectedShare:null,
      displayShareCard: false,
      destroyPieChart: false,
      shareValues: [],

      pieChartInfo: {}
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
      this.destroyPieChart = true;
      this.displayShareCard = true;
    })


  },

  methods: {

  },

  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList,
    'portfolio-pie-chart': Chart,
    'share-card' : shareCard,
    'portfolio-info': Portfolio
    }
}
</script>

<style lang="css">
@font-face {
font-family: "Quicksand";
src: url("./assets/Quicksand.ttf");
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: Quicksand;
}

  img{
    width: 50px;
    height: 50px;
    position: relative;
    left: 10px;
    top: 6px;
  }

.share-card{
  font-family: Quicksand;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  border: solid 3px #39CCCC;
  align-items: baseline;
  width: 850px;
}

.share-list{
  width: auto;
  font-family: Quicksand;
  top: 120px;
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
  justify-content: space-around;
  border: solid 3px #39CCCC;
  width: auto;
  font-family: Quicksand;
  top: 125px;
  right: 40px;
  background: #eee;
  padding: 10px;
  height: 150px;
}

.share-card p{
  font-family: Quicksand;
}

.main-content {
  display: flex;
  justify-content: space-between;
}

</style>
