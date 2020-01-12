export default{
  formatChartData(x_labels, chartData, y_label, chartType){
    const l_chartData = {
      type: chartType,
      data: {
        labels: x_labels,
        datasets: [
          {
            label: y_label,
            data: chartData,
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

    return l_chartData;
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
