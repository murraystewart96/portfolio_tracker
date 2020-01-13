<template>
  <div id="app">
    <h1 id="title">Portfolio Tracker</h1>
    <p>{{this.shareValues}}</p>
    <div class="portfolio-total">
      <portfolio-total :shares="shares"></portfolio-total>
    </div>

    <div class="share-list">
      <h2>Your current shares</h2>
      <share-list :shares="shares"/>
    </div>

    <div class="share-card">
      <portfolio-pie-chart v-if="displayPieChart" :chartInfo="pieChartInfo" type="pie"/>
      <share-card v-if="displayShareCard" :share="selectedShare"/>
    </div>

  </div>
</template>

<script>
import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
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
      displayPieChart: false,
      shareValues: [],

      pieChartInfo: {
        data: null,
        labels: [],
        label: null
      },
    }
  },

  // watch: {
  //   selectedShare: function(){
  //     this.getPricesDaily();
  //   }
  // },

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
      this.displayPieChart = false;
      this.displayShareCard = true;
    })

    this.getShareValues()

  },

  methods: {
    getShareValues(){
      this.shares.map(share => {
        let res = (share.quantity * (parseInt(share.price)))
          this.shareValues.push(res);
          this.pieChartInfo.labels.push(share.ticker);
      });
      this.pieChartInfo.data = this.shareValues;
      this.pieChartInfo.label = "Portfolio Compisition";
      this.displayPieChart = true;
    },
  },

  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList,
    'portfolio-pie-chart': Chart,
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
