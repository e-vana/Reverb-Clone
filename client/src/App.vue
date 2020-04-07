<template>
  <div id="app">
    <FeaturedAlertBar/>
    <NavigationBar/>
    <CategoriesBar/>
    <!-- <b-progress class="loaderPos" v-if="this.$store.getters.isLoading" :value="this.$store.getters.getLoadingPercent" :max="100" animated></b-progress> -->
    <router-view/>
  </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'
import FeaturedAlertBar from '@/components/FeaturedAlertBar'
import CategoriesBar from '@/components/CategoriesBar'


export default {
  name: "App",
  components: {
    NavigationBar,
    FeaturedAlertBar,
    CategoriesBar
  }
}
</script>
<style lang="scss">

</style>
