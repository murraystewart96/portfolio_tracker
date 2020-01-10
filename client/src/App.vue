<template>
  <div id="app">
    <p>npm run serve is working</p>
    <share-card />
  </div>
</template>

<script>
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
