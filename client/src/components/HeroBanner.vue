<template>
  <div>
    <div class="hero-banner" :style="heroBannerStyle">
      <div>
        <h2 class="hero-banner-title">Vintage Amp Collection</h2>
        <h3 class="hero-banner-subtitle">presented by green grass guitars</h3>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "HeroBanner",
  data(){ 
    return {
      heroBannerStyle: {
        'background' : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${require('@/assets/vintage-music-business-shop.jpg')})`,
        'background-size': 'cover'
      }
    }
  },
}

</script>

<style lang="scss">
.hero-banner {
  width: 100vw;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero-banner h3 {
  font-size: 30px;
  text-transform: capitalize;
  color: white;

}
.hero-banner h2 {
  font-size: 72px;
  text-transform: capitalize;
  color: white;
  font-family: 'Oswald', sans-serif;
  font-weight: 200;
}
</style>