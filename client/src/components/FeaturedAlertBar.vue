<template>
  <div class="alertbar">
    <div class="alertbar-brand">
      <h4>{{ Title }}</h4>
      ||
      <h4>{{ Body }}</h4>
    </div>
    <div>
      <h4 class="alertbar-shop">shop now</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedAlertBar",
  data(){
    return {
      Title: 'Green Grass Guitars',
      Body: '20% Off'
    }
  }
}
</script>

<style lang="scss">
.alertbar {
  width: 100vw;
  background-color: $Secondary;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.alertbar h4{ 
  font-size: $FontMain;
  color: white;
  text-transform: uppercase;
  margin: 0px;
  display:inline-block;
}
</style>