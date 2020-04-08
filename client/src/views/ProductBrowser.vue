<template>
  <div>
    <div class="category-bannerhead" :style="categoryBannerStyle">
      <h2>Electric Guitars</h2>
    </div>

    <div class="popular-products-container">
      <h4>Popular Products</h4>
      <ul>
        <li v-for="(product, index) in popularArr" :key="index">{{ product._id }}</li>
      </ul>
    </div>

    <div class="all-listings-container">

    </div>

  </div>
</template>

<script>

import {http} from '../util/axiosHttp.js';

export default {
  name: "ProductBrowser",
  data(){
    return {
      categoryBannerStyle: {
        'background' : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${require('@/assets/guitar-banner.jpg')})`,
        'background-size': 'cover'
      },
      popularArr: []
    }
  },
  created: async function() {
    try {

      var popularInCategory = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/electric-guitar/popular`);
      if(!popularInCategory){
        throw "Error fetching popular items in this category."
      }
      this.popularArr = popularInCategory.data;

    } catch(err){
      console.log(err);
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