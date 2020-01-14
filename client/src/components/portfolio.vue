<template lang="html">

  <div class="">
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
        label: null,
        backgroundColor: [],
      },

    }},

    watch: {
      destroy: function(){
        eventBus.$emit('destroy-chart');
        this.loaded = false;
      }
    },

    mounted(){
      this.getShareValues();

      this.pieChartInfo.backgroundColor = this.createPieColours(this.pieChartInfo.labels)
    },

    methods: {
      getShareValues(){
        if (!this.destroy) {
          let labels = []

          this.shares.map((share) => {
            let res = (share.quantity * (parseInt(share.price)))
            this.shareValues.push(res);
            labels.push(share.ticker);
          });
          const newData = {
            data: this.shareValues,
            labels: labels,
            label: 'Portfolio Composition',
            backgroundColor: [],
            type: 'pie'
            }

            this.pieChartInfo = newData;
            this.loaded = true;
          }
        },

        createPieColours(arrayOfShares){
          let colours = [];
          let r;
          let g;
          let b;
          let newColour;
          arrayOfShares.forEach( (share) => {
            r = Math.floor(Math.random() * 200);
            g = Math.floor(Math.random() * 200);
            b = Math.floor(Math.random() * 200);
            newColour = 'rgba(' + `${r}` + ', ' + `${g}` + ', ' + `${b}`+ ')';
            colours.push(newColour)
          }
        )
        return colours
      }

    },

    components: {
      'pie-chart': Chart,
    }

  }
  </script>

  <style lang="css" scoped>
  </style>
