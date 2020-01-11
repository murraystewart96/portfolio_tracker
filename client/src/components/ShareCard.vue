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
          :options="options"/>
      </div>
    </div>

  </div>
</template>

<script>
import LineChart from './ShareChart.vue'
// import ShareService from '../services/ShareService.js'
import {Line} from 'vue-chart.js'
export default {
  name: 'share-card',
  components: {LineChart},

  data: () => ({
    loaded: false,
    chartdata: null
  }),

  async mounted(){
    this.loaded = false
  },

  methods: {

  },

}
</script>

<style lang="css" scoped>
</style>
