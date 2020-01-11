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
      chartdata: [],

    }
  },

  methods:{

  },

   mounted(){
    this.renderChart(this.chartdata,this.options)

  }
}

</script>

<style lang="css" scoped>
</style>
