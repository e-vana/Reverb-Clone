<template>
  <div>
    <div class="listing-container">
        <div class="listing-img">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <b-carousel-slide 
              v-for="(image, index) in images"
              :key="index"
              :caption="listing.listingTitle"
              :text="listing.condition"
              :img-src="image"
              >

              </b-carousel-slide>
            </b-carousel>
        </div>

        <div class="listing-info">
          <div>
            <div class="title-bar">
              <h3>{{ listing.listingTitle }}</h3>
              <b>{{ listing.condition }} Condition</b>
              <h2>${{ listing.price }}</h2>
              <p>+${{ listing.shippingPrice }} shipping</p>
              <b-button-group>
                <b-button variant=primary class="mr-2" @click="addToCart">Add to Cart</b-button>
                <b-button  class="mr-2">Make an Offer</b-button>
                <b-button @click="addToWatchList" >Watch</b-button>
              </b-button-group>

            </div>
            <div>
              <h3>About This listing</h3>
              <p>{{ listing.description }}</p>
            </div>
          </div>
        </div>
    </div>


  </div>
</template>

<script>
import {http} from '../util/axiosHttp.js';

export default {
  name: "SingleListing",
  data(){
    return {
      listing: '',
      images: []
    }
  },
  created: async function() {
    try {
      var listing = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/${this.$route.params.listingId}`)
      if(listing){
        this.listing = listing.data[0];
        this.images = listing.data[0].images;

        // Add item to recently viewed items store
        this.$store.dispatch("setRecentItem", this.listing);
      }


      
    }catch(err){
      console.log(err)
    }
  },
  methods: {
    addToCart: function() {
      this.$store.dispatch("addToCart", this.listing)
    },
    addToWatchList: function(){ 
      this.$store.dispatch("setWatchListItem", this.listing)
    }
  }
}
</script>

<style lang="scss">

.listing-container {
  // width: 100%;
  margin: 40px 200px;
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
}
.listing-img {
  width: 50%;
  min-width: 500px;
}
.listing-info {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
  min-width: 500px;
}
.title-bar {
  margin-bottom: 40px;
}
</style>