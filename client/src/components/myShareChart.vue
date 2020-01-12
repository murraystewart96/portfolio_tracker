<template lang="html">
  <div>
    <canvas id="prices-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import SharesService from "@/services/ShareService.js"
import SharesChart from "@/chartHelpers/sharesChart.js"

export default {
  name: "prices-chart",
  data(){
    return {
      chartData: null
    }
  },

  mounted(){
    SharesService.getPricesDaily("AAPL")
    .then((prices) => {
      console.log(prices);
      this.chartData = SharesChart.formatChartData(["Mon", "Tue", "Wed", "Thur", "Fri"], prices, "Daily Prices");
      SharesChart.createChart('prices-chart', this.chartData);
    })
  },




  }


</script>

<style lang="css" scoped>
</style>
