<template lang="html">
  <div>
    <canvas id="prices-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import SharesService from "@/services/ShareService.js"
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
      this.chartData = this.formatChartData(["Mon", "Tue", "Wed", "Thur", "Fri"], prices, "Daily Prices");
      this.createChart('prices-chart', this.chartData);
      console.log("HEEEELLLLOOO");
    })
  },

  methods: {
    formatChartData(x_labels, priceData, y_label){
      const chartData = {
        type: 'line',
        data: {
          labels: x_labels,
          datasets: [
            {
              label: y_label,
              data: priceData,
              backgroundColor: [
                'rgba(54,73,93,.5)', // Blue
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)'
              ],
              borderColor: [
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
              ],
              borderWidth: 3
            }
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero: true,
                  padding: 25,
              }
            }]
          }
        }

      }

      return chartData;
    },

    createChart(chartId, chartData){
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
