<template lang="html">
  <div class="share-chart-wrapper">
    <h2>Share name | {{shareSelected.ticker}}</h2>

    <div class="share-info">
      <p>Current valuation: {{shareSelected.quantity*shareSelected.price}} </p>
      <p>Exchange: {{shareSelected.exchange}} </p>
      <p>Number of shares: {{shareSelected.quantity}} </p>
      <p>Share price: {{shareSelected.price}} </p>
    </div>

    <div class="chart-container">
      <canvas id="share-chart" width="400" height="400"></canvas>
        <line-chart
          v-if="loaded"
          :chartdata="chartdata"
          :options="options"
          :shareSelected="shareSelected"/>
    </div>

  </div>
</template>

<script>
import {Line} from 'vue-chart.js'
import LineChart from './ShareChart.vue'
import SharesService from './../services/ShareService'

export default {
  name: 'share-card',
  components: {LineChart},
  props: ['shares'],

  data(){
    return{
    loaded: false,
    shareId: 0,
    // This is a dummy share selected to test "share-info div this would be from
    //eventBus in the final app"
    shareSelected:{ _id: "5e199937dc3127e9ea7607ae",
    price: 310,
    ticker: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    quantity: 30},
  }}
  ,

  async mounted(){
    this.shares = SharesService.getShares()

    this.loaded = false
    try {
      this.chartdata = null
      this.loaded = true
    } catch(e) {
      console.error(e);
    }

    eventBus.$on('share-displayed', id => id === this.shareId);
    this.shareSelected = shares.filter(share => share._id == share)
  },

  methods: {

  },

}
</script>

<style lang="css" scoped>
</style>
