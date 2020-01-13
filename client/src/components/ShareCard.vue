<template lang="html">
  <div class="share-chart-wrapper">
    <h2>{{share.ticker}}</h2>

    <div class="share-info">
      <p>Current valuation: {{share.quantity*share.price}} </p>
      <p>Exchange: {{share.exchange}} </p>
      <p>Number of shares: {{share.quantity}} </p>
      <p>Share price: {{share.price}} </p>
    </div>

    <div class="chart-container">
      <shares-chart v-if="loaded" :data="chartData" type="line"/>
    </div>

    <div class="buttons">
      <form id="add-shares" v-on:submit.prevent="handleAddShares(share._id)">
      		<div class="formWrap">
      			<label for="add">Shares:</label>
      			<input min="0.0" step="1.0" type="number" required v-model="add" placeholder="Enter number "/>
      		</div>
          <input type="submit" value="Add Shares" id="add"/>

      </form>

      <br/>
      <br/>

      <form id="remove-shares" v-on:submit.prevent="handleRemoveShares(share._id)">
      		<div class="formWrap">
      			<label for="remove">|   Shares:</label>
      			<input min="0.0" step="1.0" type="number" required v-model="remove" placeholder="Enter number "/>
      		</div>
          <input type="submit" value="Remove Shares" id="remove"/>
      </form>

    </div>

  </div>
</template>

<script>
import {eventBus} from '../main.js'
import pricesChart from "./myShareChart"
import SharesChart from "@/chartHelpers/sharesChart.js"
import SharesService from "../services/ShareService.js"


export default {
  name: 'share-card',
  components: {
    'shares-chart': pricesChart,
  },

  components: {'shares-chart': pricesChart},
  props: ['share'],

  data(){
    return{
    loaded: false,
    chartData: null,
    add: 0,
    remove: 0
  }},

  mounted(){
    SharesService.getPricesDaily(this.share.ticker)
    .then((prices) => {
      console.log(prices);
      this.loaded = true
      this.chartData = prices;
      form.reset()
    })
  },

  methods: {
    handleAddShares(id){
      this.share.quantity += parseFloat(this.add)
      SharesService.update(id)
      eventBus.$emit('booking-updated', this.share)
      this.add = 0;
  },
  handleRemoveShares(id){
    this.share.quantity -= parseFloat(this.remove)
    SharesService.update(id)
    eventBus.$emit('booking-updated', this.share)
      this.remove = 0;
}
}

}
</script>

<style lang="css" scoped>
.buttons {
  display: flex;
  padding: 10px;
  font-size: 0.75em;
  justify-content: space-between;
  align-content: space-between;
}

#add-shares {
  padding: 10px;
}

#remove-shares {
  padding: 10px;
}

#remove {
  display: flex;
  align-items: flex-end;
  margin: 5px;
}

#add {
  display: flex;
  align-items: flex-end;
  margin: 5px;
}

</style>
