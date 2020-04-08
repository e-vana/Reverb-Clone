<template>
  <div>
    <div class="category-bannerhead" :style="categoryBannerStyle">
      <h2>Electric Guitars</h2>
    </div>
    <div class="popular-products-container">
      <h4>Popular Products</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBrowser",
  data(){
    return {
      categoryBannerStyle: {
        'background' : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${require('@/assets/guitar-banner.jpg')})`,
        'background-size': 'cover'
      }
    }
  }
}
</script>

<style>

.category-bannerhead {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.category-bannerhead h2 {
  font-size: 42px;
  text-transform: capitalize;
  color: white;
}
</style>