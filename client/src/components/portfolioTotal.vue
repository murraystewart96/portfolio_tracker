<template lang="html">
  <div class="PortfolioTotal">
  <h2>Portfolio Total</h2>
  <h4>value: £{{totalValue}}</h4>
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
methods: {
  getTotalValue(){
    ShareService.getTotalValue(shares)
    .then(data => this.totalValue = data)
    }

  }
}
</script>

<style lang="css" scoped>
</style>
