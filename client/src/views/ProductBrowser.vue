<template>
  <div>
    <div class="category-bannerhead" :style="computedCategoryBannerUrl">
      <h2>{{ categoryString }}</h2>
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
            <b-form-radio v-model="selected" name="some-radios" value="recent">Most Recent</b-form-radio>
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
      <h4 class="popular-products-title">Popular {{ categoryString }}</h4>
        <div class="horizontal-card-container">
          <!-- <b-card-group deck> -->
            <ItemCard 
              v-for="(product, index) in popularArr"
              :key="index"
              :imageUrl="product.images[0]"
              :price="product.price"
              :itemName="product.listingTitle"
              :condition="product.condition"
            />
          <!-- </b-card-group> -->
        </div>
    </div>

    <div class="all-listings-container">
      <h4 class="all-listings-container-title">All {{ categoryString }}</h4>
      <ul>
        <li v-for="(listing, index) in listingsArr" :key="index">{{ listing._id }}</li>
      </ul>
    </div>

  </div>
</template>

<script>

import {http} from '../util/axiosHttp.js';
import ItemCard from '../components/ItemCard'
// import FiltersBar from '../components/FiltersBar';

export default {
  name: "ProductBrowser",
  components: {
    // FiltersBar
    ItemCard
  },
  data(){
    return {
      // categoryBannerStyle: {
      //   'background' : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${this.computedCategoryBannerUrl}")`,
      //   'background-size': 'cover'
      // },
      listingsArr: [],
      popularArr: [],
      usedOnly: false,
      selected: '',
      categoryBannerUrl: ''
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
        if(this.selected == 'recent'){
          queryStr += '&recent=true'
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
      // console.log(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/popular`)

      // Fetch the banner image URL
      var categoryBannerUrl = await http().get(`${process.env.VUE_APP_API_URL}/api/categories/${this.$route.params.category}/header-url`);
      this.categoryBannerUrl = categoryBannerUrl.data.url;

      // Fetch the Popular Items in category
      var popularInCategory = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/popular`);
      if(!popularInCategory){
        throw "Error fetching popular items in this category."
      }
      this.popularArr = popularInCategory.data;

    } catch(err){
      console.log(err);
    }
  },
  computed:{
    categoryString() {
      var category = this.$route.params.category.split("-");
      var catString = category.join(" ");
      return catString;
    },
    computedCategoryBannerUrl() {
      var BannerUrlStyle = {
        'background' : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${this.categoryBannerUrl}")`,
        'background-size': 'cover'
      }

      return BannerUrlStyle;
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

.all-listings-container-title, .popular-products-container {
  text-transform: capitalize;
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
.popular-products-container{
  padding: 20px;
}

.horizontal-card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>