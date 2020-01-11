<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>
    <portfolio-total :shares="shares"/>
    <share-list :shares="shares"/>
    <!-- <portfolio-total :shares="shares"/>
    <share-list :shares="shares"/> -->
  </div>
</template>

<script>

import SharesService from "./services/ShareService.js"
import portfolioTotal from  "./components/portfolioTotal"
import shareList from  "./components/shareList"


export default {
  name: 'app',
  data(){
    return {
      shares: [],
      temp: null

    }
  },
  components: {
    'portfolio-total' : portfolioTotal,
    'share-list' : shareList

  },
  mounted(){
    SharesService.getShares()
    .then(data => {
      this.shares = data;
      debugger;
    })




  },

  methods: {

  },

  components: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
