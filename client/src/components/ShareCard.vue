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
      <canvas id="share-chart" width="400" height="400">
        <line-chart
          v-if="loaded"
          :options="options"
          :shareSelected="shareSelected"/>
        </canvas>
    </div>

  </div>
</template>

<script>
import {Line} from 'vue-chart.js'
import LineChart from './ShareChart.vue'
import SharesService from './../services/ShareService'
import {eventBus} from './../main.js'

export default {
  name: 'share-card',
  components: {LineChart},
  props: ['shares'],

  data(){
    return{
    loaded: false,
    shareId: 0,
    shareSelected:{ }
  }},

 mounted(){
    this.shares = SharesService.getShares()

    eventBus.$on('share-displayed', id => id === this.shareId)

    this.shareSelected = this.shares.filter(share => share._id == share)


    this.loaded = false
    try {
      this.chartdata = null
      this.loaded = true
    } catch(e) {
      console.error(e);
    }

  },

  methods: {

  },

}
</script>

<style lang="css" scoped>
</style>
