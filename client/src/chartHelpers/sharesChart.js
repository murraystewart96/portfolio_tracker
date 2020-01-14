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
            fill:false,
            borderColor: [
              '#39cccc',
              '#39cccc',
              '#39cccc',
              '#39cccc',
              '#39cccc',
              '#39cccc',
              '#39cccc',
              '#39cccc',
            ],
            borderWidth: 3,
            borderCapStyle: 'round',
            borderJoinStyle: 'miter',

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
        },
        responsive: true,
        maintainAspectRatio: false
      }

    }

    return l_chartData;
  },

  createChart(chartId, chartData){
    const ctx = document.getElementById(chartId);
    return new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options
    })
  }
}
