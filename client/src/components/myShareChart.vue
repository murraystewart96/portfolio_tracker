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

  methods: {

    isUpTrending(data){
      let upTrend;
      if (data[-1] > data[-2] && data[-2] > data[-3]){
        return upTrend = true;
      } else if (data[-1] < data[-2] && data [-2] < data[-3]) {
        return upTrend = false
      } else{
        return null;
      }
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

  #chart{
    height: 300px;
    width: 600px;
  }

</style>
