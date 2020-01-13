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
      <shares-chart v-if="loaded" :chartInfo="chartInfo" type="line"/>
    </div>

  </div>
</template>

<script>
// import ShareService from '../services/ShareService.js'
import Chart from "./myShareChart"
import SharesChart from "@/chartHelpers/sharesChart.js"
import SharesService from "../services/ShareService.js"
import { eventBus } from '../main.js';


export default {
  name: 'share-card',

  components: {'shares-chart': Chart},
  props: ['share'],

  data(){
    return{
    loaded: false,
    chartInfo: {
      data: null,
      labels: [],
      label: null
    }
  }},

  watch: {
    share: function(){
      this.getPricesDaily()
      .then(() => {
        eventBus.$emit('re-render-chart', this.chartInfo);
      })
    }
  },

  methods: {
    getPricesDaily(){
      return SharesService.getPricesDaily(this.share.ticker)
      .then((prices) => {
        const newData = {
          data: prices,
          labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
          label: "Daily Prices",
          type: "line"
        }
        this.chartInfo = newData
        console.log("CHART INFO CHANGED");
        this.loaded = true
      })
    }
  },

  mounted(){
    this.getPricesDaily();
  }

}
</script>

<style lang="css" scoped>
</style>
