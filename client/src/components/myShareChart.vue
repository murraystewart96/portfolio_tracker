<template lang="html">
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import SharesService from "@/services/ShareService.js"
import SharesChart from "@/chartHelpers/sharesChart.js"
import { eventBus } from '../main.js';


export default {
  name: "chart",
  props: ['chartInfo', 'type'],
  data(){
    return {
      chartData: null
    }
  },
  mounted(){
    console.log(this.type)
    this.renderChart();

    eventBus.$on('re-render-chart', () => {
      console.log("RERENDER");
      this.renderChart();
    })
  },
  methods: {
    renderChart(){
      this.chartData = SharesChart.formatChartData(this.chartInfo.labels, this.chartInfo.data, this.chartInfo.label, this.type);
      SharesChart.createChart('chart', this.chartData);
    }
  }
}




</script>

<style lang="css" scoped>
</style>
