<template>
  <div>
    <h1>Your Cart</h1>
    <ul>
      <li v-for="(item, index) in this.$store.getters.getCart" :key="index">{{item}}</li>

    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>