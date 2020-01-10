<template>
  <div id="app">
    <p>npm run serve is working</p>
  </div>
</template>

<script>
import StockCard from './components/ShareCard.vue'
export default {
  name: 'app',
  components: {
    'share-card': ShareCard,
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
