<template lang="html">
  <div class="share-chart-wrapper">
    <h2>{{shareSelected.ticker}}</h2>

    <div class="share-info">
      <p>Current valuation: {{shareSelected.quantity*shareSelected.price}} </p>
      <p>Exchange: {{shareSelected.exchange}} </p>
      <p>Number of shares: {{shareSelected.quantity}} </p>
      <p>Share price: {{shareSelected.price}} </p>
    </div>

    <div class="chart-container">
        <prices-chart/>
    </div>

  </div>
</template>

<script>
import {Line} from 'vue-chart.js'
import LineChart from './ShareChart.vue'
import SharesService from './../services/ShareService'
import {eventBus} from './../main.js'
import pricesChart from "./myShareChart"

export default {
  name: 'share-card',

  components: {LineChart,
  'prices-chart': pricesChart},

  props: ['share'],

  data(){
    return{
    loaded: false,
    shareId: 0,
    shareSelected:{ }
  }},
  
 mounted(){


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
