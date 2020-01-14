<template lang="html">

  <div class="share-card-wrapper">

    <h2>{{share.ticker}}</h2>

    <div class="share-info">
      <p>Name of Company: {{share.name}}</p>
      <p>Current valuation: {{share.quantity*share.price}} </p>
      <p>Exchange: {{share.exchange}} </p>
      <p>Number of shares: {{share.quantity}} </p>
      <p v-bind:style="[upTrend ? {'color' : 'green'}: {'colour' :'red'}]"> Share price: ${{share.price}} </p>
      <button class="button" v-on:click="handlePriceFunc('intraDay')">IntraDay Prices</button>
      <button class="button" v-on:click="handlePriceFunc('daily')">Daily Prices</button>
      <button class="button" v-on:click="handlePriceFunc('monthly')">Month to Date Prices</button>
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
      			<label for="remove"> Shares:</label>
      			<input min="0.0" step="1.0" type="number" required v-model="remove" placeholder="Enter number "/>
      		</div>
          <input type="submit" value="Remove Shares" id="remove"/>
      </form>

    </div>

  </div>

</template>

<script>
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
    chartInfoApiLimit: {
      data: [],
      labels: [],
      label: "Exceeded API limit. Go Premuim for just $200/month",
      type: "line"
    },
    upTrend: true,
    add: 0,
    remove: 0,
    getPricesFunc: null
  }},

  watch: {
    share: function(){
      this.getPricesFunc()
      .then(() => {
        eventBus.$emit('re-render-chart', this.chartInfo);
      })
    }
  },

  methods: {


    getPricesDaily(){
      return SharesService.getPricesDaily(this.share.ticker)
      .then((prices) => {
        if(prices){
          const newData = {
            data: prices,
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
            label: "Daily Prices",
            type: "line"
          }
          this.chartInfo = newData;
          console.log("CHART INFO CHANGED");
          this.loaded = true
        }else{
          this.chartInfo = this.chartInfoApiLimit;
          this.loaded = true
        }
      })
    },

    getPricesIntraday(){
      return SharesService.getPricesIntraday(this.share.ticker)
      .then((prices) => {
        if(prices){
          const newData = {
            data: prices,
            labels: ["9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30"],
            label: "Prices During Day",
            type: "line"
          }
          this.chartInfo = newData;
          this.loaded = true
        }else{
          this.chartInfo = this.chartInfoApiLimit;
          this.loaded = true
        }
      })
    },

    getPricesMonth(){
      return SharesService.getPricesMonth(this.share.ticker)
      .then((data) => {
        console.log("MONTHLY PRICES", data.prices);
        if(data.prices){
          console.log("UPDATED SHARE", this.share)
          const newData = {
            data: data.prices,
            labels: data.labels,
            label: "Prices During Month",
            type: "line"
          }
          this.chartInfo = newData;
          this.loaded = true
        }else{
          this.chartInfo = this.chartInfoApiLimit;
          this.loaded = true
        }
      })

    },

    handlePriceFunc(funcType){
      if(funcType === "intraDay"){
        this.getPricesIntraday()
        .then(() => {
          eventBus.$emit('re-render-chart', this.chartInfo)
          this.getPricesFunc = this.getPricesIntraday;
        })
      }else if(funcType === "daily"){
        this.getPricesDaily()
        .then(() => {
          eventBus.$emit('re-render-chart', this.chartInfo)
          this.getPricesFunc = this.getPricesDaily;
        })
      }else if(funcType === "monthly"){
        this.getPricesMonth()
        .then(() => {
          eventBus.$emit('re-render-chart', this.chartInfo)
          this.getPricesFunc = this.getPricesMonth;
        })
      }

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

    this.getPricesFunc = this.getPricesIntraday;
    this.getPricesIntraday();

    eventBus.$on('up-trend', upTrend => {
      this.upTrend = upTrend
    })
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

.button {
  display: flex;
  margin: 5px;
  justify-content: center;
  align-items: space-between;
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
.chart-container {
  height: 300px;
  display: flex;
  justify-content: center;
  margin: 30px;
}

.share-card-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.share-chart{
  display: flex;
  align-items:baseline;
}

button {
  height: auto;
  width: 80px;
  margin: 8px;
}

</style>
