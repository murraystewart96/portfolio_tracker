<template lang="html">

</template>

<script>
import {eventBus} from '../main.js'
import {Line} from 'vue-chartjs'

export default {
  name: 'share-chart',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null
    }
  }

  data(){
    return{}
  }

  mounted(){
    this.renderChart(this.chartdata,this.options)
,

}
</script>

<style lang="css" scoped>
</style>
