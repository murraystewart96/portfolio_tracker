<template>
  <div id="app">
<<<<<<< HEAD
    <p>npm run serve is working</p>
    <share-card />
=======
    <h1>Portfolio Tracker</h1>
    <portfolio-total :shares="shares"/>
    <share-list :shares="shares"/>
>>>>>>> 89fc39e8e1292fc9a08c8c7d9cde7d345eede822
  </div>
</template>

<script>
<<<<<<< HEAD
import ShareCard from './components/ShareCard.vue'
export default {
  name: 'app',
  data(){
    return{
      chartdata:{},
      options:{}
    }
  },
  components: {
    'share-card': ShareCard,
=======

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

>>>>>>> 89fc39e8e1292fc9a08c8c7d9cde7d345eede822
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
