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
      <canvas id="share-chart" width="400" height="400"></canvas>
      <div class="container">
        <line-chart
          v-if="loaded"
          :chartdata="chartdata"
          :options="options"
          :shareSelected="shareSelected"/>
      </div>
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
    shareSelected: {},
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
