<template lang="html">
  <div class="share-chart-wrapper">
    <h2>{{share.ticker}}</h2>

    <div class="share-info">
      <p>Current valuation: {{share.quantity*share.price}} </p>
      <p>Exchange: {{share.exchange}} </p>
      <p>Number of shares: {{share.quantity}} </p>
      <p>Share price: {{share.price}} </p>
    </div>

    <div class="chart-container">
      <shares-chart v-if="loaded" :data="chartData" type="line"/>
    </div>

  </div>
</template>

<script>
// import ShareService from '../services/ShareService.js'
import pricesChart from "./myShareChart"
import SharesChart from "@/chartHelpers/sharesChart.js"
import SharesService from "../services/ShareService.js"


export default {
  name: 'share-card',
  components: {
    'shares-chart': pricesChart,
  },

  components: {'shares-chart': pricesChart},
  props: ['share'],

  data(){
    return{
    loaded: false,
    chartData: null
  }},

  mounted(){
    SharesService.getPricesDaily(this.share.ticker)
    .then((prices) => {
      console.log(prices);
      this.loaded = true
      this.chartData = prices;
    })
  },

  methods: {

  },

}
</script>

<style lang="css" scoped>

  

</style>
