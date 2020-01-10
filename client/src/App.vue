<template>
  <div id="app">
    <h1>Portfolio Tracker</h1>

  </div>
</template>

<script>

import SharesService from "../services/SharesService.js"

export default {
  name: 'app',
  data(){
    return {
      shares: [],
      temp: null

    }
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
