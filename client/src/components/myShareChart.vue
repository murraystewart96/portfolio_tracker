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
  props: ['chartInfo'],
  data(){
    return {
<<<<<<< HEAD
      chart: null,
      chartData: null
=======
      chartData: null,
>>>>>>> develop
    }
  },

  methods: {

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

  },

  mounted(){
    if(this.chart) this.destroyChart();
    this.renderChart();

    eventBus.$on('re-render-chart', () => {
      this.destroyChart();
      this.renderChart();

      const upTrend = isUpTrending(this.ChartInfo.data)
      eventBus.$emit('up-trend', upTrend)
    })

    eventBus.$on('destroy-chart', () => {
      console.log("YAAAAAASSSSS");
      this.destroyChart();
    })
  },

  methods: {
    renderChart(){
      this.chartData = SharesChart.formatChartData(this.chartInfo.labels, this.chartInfo.data, this.chartInfo.label, this.chartInfo.type);
      this.chart = SharesChart.createChart('chart', this.chartData);
    },
    destroyChart(){
      console.log("destroyed");
      this.chart.destroy();
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
