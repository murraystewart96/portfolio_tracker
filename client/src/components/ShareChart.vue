<template lang="html">

</template>

<script>
import {eventBus} from '../main.js'
import { Line } from 'vue-chartjs'
import SharesService from './../services/ShareService'

export default {
  extends: Line,

  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    shareSelected: {
      type: Object,
      default: null
    }
  },

  data(){
    return{

    }
  },

   mounted(){
    this.renderChart(this.chartdata)

    
  }
}

</script>

<style lang="css" scoped>
</style>
