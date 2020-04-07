<template>
  <div>
    <HeroBanner/>

    <p>This is the loading state: {{ $store.getters.isLoading }}</p>
  </div>
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue'
export default {
  name: 'Home',
  components: {
    HeroBanner
  },
  data(){ 
    return {
    }
  }
}
</script>
<style lang="scss">




</style>