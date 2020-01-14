<template lang="html">
  <div class="myshares">
    <div id="sharelist" v-for="share in shares">
    <button v-on:click="displayShareCard(share)">{{ share.ticker }}</button>
  </div>
</div>
</template>

<script>
import { eventBus } from '../main.js';
import ShareService from '../services/ShareService';

export default {
  name: "share-list",
  props: ["shares"],
	methods: {

    displayShareCard(share){
      eventBus.$emit('display-share', share);
    }
  }
}
</script>

<style lang="css" scoped>
  .myshares {
    padding: 5px;
  }
  #sharelist {
    padding: 5px;
  }
  #dontDisplay {
  display: none;
}
</style>
