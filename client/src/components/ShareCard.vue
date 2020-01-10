<template lang="html">
  <div class="share-chart-wrapper">
    <h2>{{share.name}} | {{share.ticker}}</h2>

    <div class="share-info">

    </div>

    <div class="">
      <canvas id="share-chart" width="400" height="400"></canvas>
    </div>

  </div>
</template>

<script>
import {eventBus} from '../main.js'
import ShareService from '../services/ShareService.js'
export default {
  name: 'share-card',
  props: [''],

  data(){
    return {}
  },

  methods: {

  },

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

}
</script>

<style lang="css" scoped>
</style>
