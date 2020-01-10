<canvas id="share-chart" width="400" height="400"></canvas>
  let myChar = document.getElementById('share-chart');
  let shareChart = new Chart(myChart,{
    type: 'line',
    data: {
      labels: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
      datasets: [
        {
          data: [65,59,80,56,55,40]
        }
      ]
    },
    xAxisID: "Timeline",
    yAxisID: "Price ($ USD)"
  })

export{}
