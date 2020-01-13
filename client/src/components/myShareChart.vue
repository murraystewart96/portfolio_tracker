<template lang="html">
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import SharesService from "@/services/ShareService.js"
import SharesChart from "@/chartHelpers/sharesChart.js"

export default {
  name: "prices-chart",
  props: ['data', 'type'],
  data(){
    return {
      chartData: null
    }
  },
  mounted(){
    console.log(this.type)
    this.chartData = SharesChart.formatChartData(["Mon", "Tue", "Wed", "Thur", "Fri"], this.data, "Daily Prices", this.type);
    SharesChart.createChart('chart', this.chartData);
  }
}




</script>

<style lang="css" scoped>

  #chart{
    height: 300px;
    width: 600px;
  }

</style>
