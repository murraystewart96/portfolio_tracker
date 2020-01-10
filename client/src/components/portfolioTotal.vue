<template lang="html">
  <h2>Portfolio Total</h2>
  <h4>{{}}</h4>
</template>

<script>
import ShareService from '../services/ShareService';

export default {
  name: "Portfolio Total",
  props: ['shares']
  data: {
    totalValue: 0
  },
  computed: {
      totalValue: function(){
        return this.accounts.reduce((runningTotal, account) => {
          return runningTotal + account.balance;
        }, 0);
},
methods: {
  getTotalValue(shares);
// let shareslist = getShares which will retrieve all the shares from the api
// for (share in shareslist){
//        value = (share.price * share.quantity)
//    shareValues.push(value)};
//
}
getTotalValue(shares){
  let total = 0;

  for (share in shares){
    value = share.price * share.quantity;
    total += value
  };
  return total;
}
</script>

<style lang="css" scoped>
</style>
