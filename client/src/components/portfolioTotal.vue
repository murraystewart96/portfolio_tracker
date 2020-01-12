<template lang="html">
  <div class="PortfolioTotal">
  <h2>Portfolio Total</h2>
  <h4>value: £{{total}}</h4>
  </div>
</template>

<script>
import ShareService from '../services/ShareService.js';

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
      for (const share of this.shares) {
        let value = (parseInt(share.price)) * share.quantity;
         this.totalValue += value;
      };
      return this.totalValue;

    }
  }
}
</script>

<style lang="css" scoped>
</style>
