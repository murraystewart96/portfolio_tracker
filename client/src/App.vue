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
        <portfolio-info v-if="sharesLoaded":shares="shares" :destroy="destroyPieChart"/>
        <share-card v-if="displayShareCard" :share="selectedShare"/>
      </div>

      <div class="portfolio-total">
        <portfolio-total :shares="shares"></portfolio-total>
      </div>
    </div>

    <div>
      <carousel> here is the news carousel</carousel>
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
import Carousel from './components/carousel'

export default {
  name: 'app',
  data(){
    return {
      shares: [],

      selectedShare:null,
      displayShareCard: false,
      destroyPieChart: false,
      shareValues: [],
      sharesLoaded: false,
      pieChartInfo: {}
    }
  },



  mounted(){

    //get shares from database
    SharesService.getShares()
    .then((data) => {
      //assign shares
      this.shares = data;
      //update shares to get price
      SharesService.updateSharePrices(this.shares)
      .then(() => {

        this.updateShares()
      })
    })

    eventBus.$on("display-pie", (shares) => {
      this.shares = shares;
      this.destroyPieChart = false;
      this.displayShareCard = false;
    })

    eventBus.$on("display-share", (share) => {
      this.selectedShare = share;
      this.destroyPieChart = true;
      this.displayShareCard = true;
    })

  },

  methods: {
    updateShares(){

      let promises =[];

      for(let i = 0; i < this.shares.length; i++){
        const updatedShare = {
          ticker: this.shares[i].ticker,
          name: this.shares[i].name,
          exchange: this.shares[i].exchange,
          quantity: this.shares[i].quantity,
          price: this.shares[i].price
        }
      console.log("UPDATED SHARE", updatedShare)
      promises.push(SharesService.update(this.shares[i]._id, updatedShare))
      }

      Promise.all(promises)
      .then(result => this.sharesLoaded = true);
    }
  },


  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList,
    'portfolio-pie-chart': Chart,
    'share-card' : shareCard,
    'portfolio-info': Portfolio,
    'carousel': Carousel
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
  height: auto;
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
