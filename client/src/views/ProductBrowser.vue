<template>
  <div v-if="!this.$store.getters.isLoading" class="product-browser">
    <div class="category-bannerhead" :style="computedCategoryBannerUrl">
      <h2>{{ categoryString }}</h2>
    </div>

    <!-- <div class="filters-bar">
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
    </div> -->
    <div class="all-products-container">
      <div class="popular-products-container">
        <h4 class="popular-products-title">Popular {{ categoryString }} </h4>
        <p>
          <router-link :to="`/c/${this.$route.params.category}/all/?popular=true`">View All </router-link>
        </p>

        
          <div class="horizontal-card-container">
            <!-- /item/number-hyphenated listing name -->
              <ItemCard 
                v-for="(product, index) in popularArr" :key="index"
                :imageUrl="product.images[0]"
                :price="product.price"
                :shippingPrice="product.shippingPrice"
                :itemName="product.listingTitle"
                :condition="product.condition"
                :itemLink="`/item/${product._id}`"
              />
          </div>
      </div>

      <div class="popular-products-container">
        <h4 class="popular-products-title">Recently added {{ categoryString }} Listings</h4>
        <p>
          <router-link :to="`/c/${this.$route.params.category}/all/?recent=true`">View All </router-link>
        </p>
          <div class="horizontal-card-container">
            <ItemCard 
              v-for="(product, index) in recentArr" :key="index"
              :imageUrl="product.images[0]"
              :price="product.price"
              :shippingPrice="product.shippingPrice"
              :itemName="product.listingTitle"
              :condition="product.condition"
              :itemLink="`/item/${product._id}`"
            />
          </div>
      </div>

      <div class="popular-products-container">
        <h4 class="popular-products-title">Recently Added New {{ categoryString }}</h4>
        <p>
          <router-link :to="`/c/${this.$route.params.category}/all/?used=false`">View All </router-link>
        </p>
          <div class="horizontal-card-container">
            <ItemCard 
              v-for="(product, index) in newArr" :key="index"
              :imageUrl="product.images[0]"
              :price="product.price"
              :shippingPrice="product.shippingPrice"
              :itemName="product.listingTitle"
              :condition="product.condition"
              :itemLink="`/item/${product._id}`"
            />
          </div>
      </div>

      <div class="popular-products-container">
        <h4 class="popular-products-title">Recently Added Used {{ categoryString }}</h4>
        <p>
          <router-link :to="`/c/${this.$route.params.category}/all/?used=true`">View All </router-link>
        </p>
          <div class="horizontal-card-container">
            <ItemCard 
              v-for="(product, index) in usedArr" :key="index"
              :imageUrl="product.images[0]"
              :price="product.price"
              :shippingPrice="product.shippingPrice"
              :itemName="product.listingTitle"
              :condition="product.condition"
              :itemLink="`/item/${product._id}`"
            />
          </div>
      </div>
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
      listingsArr: [],
      popularArr: [],
      recentArr: [],
      usedArr: [],
      newArr: [],
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
        var query = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/electric-guitars/?`+queryStr);
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
      this.$store.dispatch("setLoading", true);
      this.$store.dispatch("setLoadingPercentage", 0);

      // Fetch the banner image URL
      var categoryBannerUrl = await http().get(`${process.env.VUE_APP_API_URL}/api/categories/${this.$route.params.category}/header-url`);
      this.categoryBannerUrl = categoryBannerUrl.data.url;
      this.$store.dispatch("setLoadingPercentage", 20);


      // Fetch the Popular Items in category
      var popularInCategory = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/popular`);
      if(!popularInCategory){
        throw "Error fetching popular items in this category."
      }
      this.popularArr = popularInCategory.data;
      this.$store.dispatch("setLoadingPercentage", 40);

      // Fetch the NEW recently added items in category
      var newInCategory = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/new`);
      if(!newInCategory){
        throw "Error fetching popular items in this category."
      }
      this.newArr = newInCategory.data;


      // Fetch the Recent Items in category
      var recentInCategory = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/recent`);
      if(!recentInCategory){
        throw "Error fetching popular items in this category."
      }
      this.recentArr = recentInCategory.data;
      this.$store.dispatch("setLoadingPercentage", 60);


      // Fetch the Used Items in category
      var usedInCategory = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/used`);
      if(!usedInCategory){
        throw "Error fetching popular items in this category."
      }
      this.usedArr = usedInCategory.data;

      this.$store.dispatch("setLoadingPercentage", 80);
      this.$store.dispatch("setLoading", false);


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
  },
  beforeRouteUpdate: async function (to, from, next) {
      try {
        // Set Loading State
        this.$store.dispatch("setLoading", true);
        this.$store.dispatch("setLoadingPercentage", 25);

        // Navigation guard when going from one category to another, wont work on router object because it's the same component?
        var listings = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${to.params.category}`);  

        this.$store.dispatch("setLoadingPercentage", 50);

        if(listings.data.length == 0){
          this.$store.dispatch("setLoadingPercentage", 100);
          this.$store.dispatch("setLoading", false);
          next(`/c/${to.params.category}/no-listings`);
        } else{
          this.$store.dispatch("setLoadingPercentage", 100);
          this.$store.dispatch("setLoading", false);
          next();
        }
      }catch(err){
        console.log(err)
      }
  }
}
</script>

<style lang="scss">

// ScrollBar Styling
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(223, 223, 223); 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $Secondary;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: lighten($Secondary, 10%)
}

a {
  color: $FontColorPrimary
}
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

.all-products-container {
  padding: 20px 80px;

}
.all-listings-container-title, .popular-products-container {
  text-transform: capitalize;
}
.popular-products-container {
  margin-bottom: 20px;
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

.horizontal-card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}



</style>