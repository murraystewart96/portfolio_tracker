<template lang="html">
  <div class="share-card">
    <pie-chart v-if="loaded" :chartInfo="pieChartInfo" type="line"/>
  </div>
</template>

<script>
import Chart from "./myShareChart"
import SharesChart from "@/chartHelpers/sharesChart.js"
import SharesService from "../services/ShareService.js"
import { eventBus } from '../main.js';
export default {
  name: 'portfolio-info',

  components: {'shares-chart': Chart},
  props: ['shares', 'values', 'destroy'],

  data(){
    return{
    loaded: false,
    shareValues: [],
    pieChartInfo: {
      data: null,
      labels: [],
      label: null
    }
  }},

  watch: {
    destroy: function(){
      eventBus.$emit('destroy-chart');
    }
  },

  mounted(){
    this.getShareValues();
  },

  methods: {
    getShareValues(){

      let labels = []

      this.shares.map(share => {
        let res = (share.quantity * (parseInt(share.price)))
          this.shareValues.push(res);
          labels.push(share.ticker);
      });
      const newData = {
        data: this.shareValues,
        labels: labels,
        label: "Portfolio Compisition",
        type: 'pie'
      }
      this.pieChartInfo = newData;
      this.loaded = true;
    },
  },

  components: {
    'pie-chart': Chart,
  }

}
</script>

<style lang="css" scoped>
</style>
