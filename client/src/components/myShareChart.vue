<template lang="html">
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import SharesService from "@/services/ShareService.js"
import SharesChart from "@/chartHelpers/sharesChart.js"
import {eventBus} from '@/main.js'

export default {
  name: "prices-chart",
  props: ['data', 'type'],
  data(){
    return {
      chartData: null
    }
  },

  methods: {

    isUpTrending(data){
      let upTrend;
      if (data[-1] > data[-2] && data[-2] > data[-3]){
        return upTrend = true;
      } else if (data[-1] < data[-2] && data [-2] < data[-3]) {
        return upTrend = false
      }
    }

  },

  mounted(){
    console.log(this.type)
    this.chartData = SharesChart.formatChartData(["Mon", "Tue", "Wed", "Thur", "Fri"], this.data, "Daily Prices", this.type);
    SharesChart.createChart('chart', this.chartData);

    isUpTrending(this.data)

    eventBus.$emit('up-trend',upTrend)
  },



}




</script>

<style lang="css" scoped>

  #chart{
    height: 300px;
    width: 600px;
  }

</style>
