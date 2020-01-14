<template lang="html">
  <div class="PortfolioTotal">
  <h2 v-on:click="displayPieChart(shares)">Portfolio Total</h2>
  <h4>Value: £{{total}}</h4>
  </div>
</template>

<script>
import ShareService from '../services/ShareService.js';
import { eventBus } from '../main.js';

export default {
  name: "portfolio-total",
  props: ['shares'],
  data() {
    return {
    totalValue: 0
  }
  },
  computed: {
    total: function() {
      this.totalValue = 0;
      for (const share of this.shares) {
        let value = (parseInt(share.price)) * share.quantity;
         this.totalValue += value;
      };
      return this.totalValue;

    }
  },
  methods: {

    displayPieChart(shares){
      eventBus.$emit('display-pie', shares);
    }
  }

}
</script>

<style lang="css" scoped>
</style>
