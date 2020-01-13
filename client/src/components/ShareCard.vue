<template lang="html">

  <div class="share-card-wrapper">

    <h2>{{share.ticker}}</h2>

    <div class="share-info">
      <p>Current valuation: {{share.quantity*share.price}} </p>
      <p>Exchange: {{share.exchange}} </p>
      <p>Number of shares: {{share.quantity}} </p>
      <p v-bind:style="[upTrend ? {'color' : 'green'}: {'colour' :'red'}]"> Share price: ${{share.price}} </p>
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
      label: null,
    },
    upTrend: true
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

    eventBus.$on('up-trend', upTrend => {
      this.upTrend = upTrend
    })
  }

}
</script>

<style lang="css" scoped>

.chart-container {
  height: 300px;
  display: flex;
  justify-content: center;
}

.share-card-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.share-chart{
  display: flex;
  align-items:baseline;


}

</style>
