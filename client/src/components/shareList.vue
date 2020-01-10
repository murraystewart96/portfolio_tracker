<template lang="html">
  <div class="myshares">
    <div id="sharelist" v-for="share in shares">
      <button v-on:click="handleDisplay(share._id)">{{ share.name }}</button>
  </div>
</div>
</template>

<script>
import { eventBus } from '../main';
import ShareService from '../services/ShareService';

export default {
  name: "share-list",
  props: ["shares"],
	methods: {
    handleDisplay(id){
      ShareService.displayShare(id)
    .then(response => eventBus.$emit('share-displayed', id));
    }
}
}
</script>

<style lang="css" scoped>
  .sharelist {
    padding: 5px;
  }
</style>
