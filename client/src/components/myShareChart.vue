<template lang="html">
    <div class="">
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
  props: ['chartInfo'],
  data(){
    return {
      chart: null,
      chartData: null
    }
  },

  mounted(){
    if(this.chart) this.destroyChart();
    if(!this.chart) this.renderChart();

    eventBus.$on('re-render-chart', () => {
      if(this.chart){
        this.destroyChart();
        this.renderChart();
      }

      const upTrend = this.isUpTrending(this.chartInfo.data)
      eventBus.$emit('up-trend', upTrend)
    })

    eventBus.$on('destroy-chart', () => {
      if(this.chart) this.destroyChart();
    })
  },

  methods: {
    renderChart(){
      this.chartData = SharesChart.formatChartData(this.chartInfo.labels, this.chartInfo.data, this.chartInfo.label, this.chartInfo.type, this.chartInfo.backgroundColor);
      this.chart = SharesChart.createChart('chart', this.chartData);
    },

    destroyChart(){
      this.chart.destroy();
      this.chart = null;
      this.chartData = null;
    },

    isUpTrending(data){
      let upTrend;
      if (data[-1] > data[-2] && data[-2] > data[-3]){
        return  upTrend = true;
      } else if (data[-1] < data[-2] && data [-2] < data[-3]) {
        return upTrend = false
      } else{
        return upTrend = null;
      }
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
