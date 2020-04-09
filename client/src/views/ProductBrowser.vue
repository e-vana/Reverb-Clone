<template>
  <div>
    <div class="category-bannerhead" :style="categoryBannerStyle">
      <h2>Electric Guitars</h2>
    </div>

    <div class="filters-bar">
      <div >
        <b-form-checkbox class="mr-4"  v-model="usedOnly" name="check-button" switch>
          Used Only
        </b-form-checkbox>
      </div>
      <div>
        <b-form-group class="mb-0">
          <b-form-radio-group>
            <b-form-radio v-model="selected" name="some-radios" value="mostRecent">Most Recent</b-form-radio>
            <b-form-radio v-model="selected" name="some-radios" value="lh">Price Low to High</b-form-radio>
            <b-form-radio v-model="selected" name="some-radios" value="hl">Price High to Low</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div>
        <b-button @click="refetchProducts()">Filter Results</b-button>
      </div>
    </div>
    <div class="popular-products-container">
      <h4>Popular Products</h4>
      <ul>
        <li v-for="(product, index) in popularArr" :key="index">{{ product._id }}</li>
      </ul>
    </div>

    <div class="all-listings-container">
      <h4>Some paginated all products</h4>
      <ul>
        <li v-for="(listing, index) in listingsArr" :key="index">{{ listing._id }}</li>
      </ul>
    </div>

  </div>
</template>

<script>

import {http} from '../util/axiosHttp.js';
// import FiltersBar from '../components/FiltersBar';

export default {
  name: "ProductBrowser",
  components: {
    // FiltersBar
  },
  data(){
    return {
      categoryBannerStyle: {
        'background' : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${require('@/assets/guitar-banner.jpg')})`,
        'background-size': 'cover'
      },
      listingsArr: [],
      popularArr: [],
      usedOnly: false,
      selected: '',
    }
  },
  methods: {
    refetchProducts: async function() {
      try {
        var queryStr = '';
        if(this.usedOnly){
          queryStr += 'used=true'
        }
        if(this.selected == 'hl'){
          queryStr += '&hl=true'
        }
        if(this.selected == 'lh'){
          queryStr += '&lh=true'
        }
        console.log(queryStr);
        var query = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/electric-guitar/?`+queryStr);
        if(!query){
          throw "Query failure"
        }
        this.listingsArr = query.data;
        console.log(this.listingsArr);
      }catch(err){
        console.log(err);
      }
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

<style lang="scss">

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

.filters-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-top: 1px solid $BorderGray;
  border-bottom: 1px solid $BorderGray;
  font-size: $FontSmaller;
  text-align: center;
}
</style>