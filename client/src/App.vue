<template>
  <div id="app">
    <!-- <FeaturedAlertBar/> -->
    <NavigationBar/>
    <CategoriesBar/>
    <b-progress class="loaderPos" v-if="this.$store.getters.isLoading" :value="this.$store.getters.getLoadingPercentage" :max="100" animated></b-progress>

    <!-- <transition name="fade" mode="out-in"> -->
      <router-view :key="$route.fullPath"/>
      <!-- <router-view/> -->

    <!-- </transition> -->
  </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'
// import FeaturedAlertBar from '@/components/FeaturedAlertBar'
import CategoriesBar from '@/components/CategoriesBar'


export default {
  name: "App",
  components: {
    NavigationBar,
    // FeaturedAlertBar,
    CategoriesBar
  }
}
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
