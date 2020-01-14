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
      <shares-chart v-if="loaded" :chartInfo="chartInfo" type="line"/>
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
// import ShareService from '../services/ShareService.js'
import Chart from "./myShareChart"
import SharesChart from "@/chartHelpers/sharesChart.js"
import SharesService from "../services/ShareService.js"
import { eventBus } from '../main.js';


export default {
  name: 'share-card',
  components: {'shares-chart': Chart},
  props: ['share'],

  data(){
    return{
    loaded: false,
    chartInfo: {
      data: null,
      labels: [],
      label: null
    },
    add: 0,
    remove: 0
  }
},

  watch: {
    share: function(){
      this.getPricesDaily()
      .then(() => {
        eventBus.$emit('re-render-chart');
      })
    }
  },

  methods: {
    getPricesDaily(){
      return SharesService.getPricesDaily(this.share.ticker)
      .then((prices) => {
        const newData = {
          data: prices,
          labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
          label: "Daily Prices"
        }
        this.chartInfo = newData
        console.log("CHART INFO CHANGED");
        this.loaded = true
      })
    },
  handleAddShares(id){
    this.share.quantity += parseFloat(this.add);
    let updatedAddShare = {
      ticker: this.share.ticker,
      name: this.share.name,
      exchange: this.share.exchange,
      quantity: this.share.quantity
    }
    SharesService.update(id, updatedAddShare)
    this.add = 0;
  },
  handleRemoveShares(id){
    this.share.quantity -= parseFloat(this.remove)
    let updatedRemoveShare = {
      ticker: this.share.ticker,
      name: this.share.name,
      exchange: this.share.exchange,
      quantity: this.share.quantity
    }
    SharesService.update(id, updatedRemoveShare)
      this.remove = 0;
}
},

  mounted(){
    this.getPricesDaily();
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
