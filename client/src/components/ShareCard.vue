<template lang="html">
  <div class="share-chart-wrapper">
    <h2>Share name | Share ticker</h2>

    <div class="share-info">
      <p>Book cost: </p>
      <p>Exchange: </p>
      <p>Number of shares: </p>
      <p>Share price: </p>
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

  data: () => ({
    loaded: false,
    chartData: null
  }),

  props: ['share'],

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
