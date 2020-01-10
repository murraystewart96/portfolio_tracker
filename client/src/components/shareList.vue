<template lang="html">
<div class="shareslist" v-for="share in shares">
    <button v-on:click="handleDisplay(share._id)">{{ share.name }}</button>

</div>
</template>

<script>
import { eventBus } from '../main';
import ShareService from '../services/ShareService';

export default {
  name: "shares-list",
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
  .shareslist {
    padding: 5px;
  }
</style>
