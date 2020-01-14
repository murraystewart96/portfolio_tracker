import Vue from 'vue'
import App from './App.vue'
import Carousel from './components/carousel.vue';

Vue.config.productionTip = false

export const eventBus = new Vue();


new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Carousel),
})
