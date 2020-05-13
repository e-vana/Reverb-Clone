<template>
  <div>
    <h2>Hey, {{ $store.getters.currentUser }}</h2>

    <div v-if="this.$store.getters.getWatchListItems.length > 0">
      <h3>Your Watched Items</h3>
      <ul>
        <li v-for="(item, index) in this.$store.getters.getWatchListItems" :key="index">{{item}}</li>
      </ul>
    </div>

    <div v-if="this.$store.getters.getRecentItems.length > 0">
      <h3>Recently Viewed Items</h3>
      <ul>
        <li v-for="(item, index) in this.$store.getters.getRecentItems" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>