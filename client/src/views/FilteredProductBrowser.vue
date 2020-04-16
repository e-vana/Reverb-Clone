<template>
  <div v-if="!this.$store.getters.isLoading" class="product-browser">
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

      <div class=products-filtered-container>
      <h4 id="all-listings-header" class="popular-products-title">All {{ categoryString }}</h4>

        <ItemCard 
          v-for="(product, index) in listingsArr"
          :key="index"
          :imageUrl="product.images[0]"
          :price="product.price"
          :itemName="product.listingTitle"
          :condition="product.condition"
          style="margin: 0px 10px"
        />
      </div>

  </div>
</template>

<script>

import {http} from '../util/axiosHttp.js';
import ItemCard from '../components/ItemCard'
// import FiltersBar from '../components/FiltersBar';

export default {
  name: "FilteredProductBrowser",
  components: {
    // FiltersBar
    ItemCard
  },
  data(){
    return {
      listingsArr: [],
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
        // Could use the router ({query: }) object instead of building the full path
        this.$router.push({path: `/c/${this.$route.params.category}/all/?${queryStr}`})

      }catch(err){
        console.log(err)
      }
    }
  },
  updated: function() {
    // Set the padding for the category header, content based on flex dimensions
    var firstItem = document.getElementsByClassName('item-card')[0];
    var distanceToLeft = window.pageXOffset + firstItem.getBoundingClientRect().left;
    var heading = document.getElementById("all-listings-header");
    heading.style.paddingLeft = `${distanceToLeft}px`;
  },
  created: async function() {
    try {

      // Set initial loader state
      this.$store.dispatch("setLoading", true);
      this.$store.dispatch("setLoadingPercentage", 0);

      // Fetch the banner image URL
      var categoryBannerUrl = await http().get(`${process.env.VUE_APP_API_URL}/api/categories/${this.$route.params.category}/header-url`);
      this.categoryBannerUrl = categoryBannerUrl.data.url;
      this.$store.dispatch("setLoadingPercentage", 20);


      var queryString = Object.keys(this.$route.query).map(key => key + '=' + this.$route.query[key]).join('&');
      console.log(queryString);

      // Fetch the item based on query parameters
      var filteredProduct = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}/?${queryString}`)
      if(!filteredProduct){
        throw "No listing found with these parameters."
      }
      this.listingsArr = filteredProduct.data;

      this.$store.dispatch("setLoadingPercentage", 40);
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
    },
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
.all-listings-container-title, .popular-products-container, #all-listings-header {
  text-transform: capitalize;
  padding: 20px 0px 10px 0px;
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
.popular-products-title {
  width: 100%;
  display: block;
}
.products-filtered-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.products-filtered-parent-container {
  padding: 40px;
}

</style>