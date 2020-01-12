<template lang="html">

</template>

<script>
import {eventBus} from '../main.js'
import { Line } from 'vue-chartjs'
import SharesService from './../services/ShareService'

export default {
  extends: Line,

  props: {
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
      chartdata: []
    }
  },

   mounted(){
    this.renderChart(this.chartdata)

    SharesService.getPricesIntraday(this.shareSelected.ticker)
    .then(data => {data = this.chartdata});
  }
}

</script>

<style lang="css" scoped>
</style>
