<template>
  <div class="sell-container">
    <div>

      <b-alert variant="primary" show class="p-5">
        <h2>Want to sell a piece of gear on {{ APP_NAME }}?</h2>
        <p>{{ APP_NAME }} provides sellers with several different protections against common scams and transaction fraud.  We're here to help you get the most for your listing and provide a great buying experience for potential buyers!</p>
        <b-button variant="primary" @click="showSellForm = !showSellForm">Sell an item!</b-button>
      </b-alert>



      <b-form v-if="showSellForm" class="mb-4">
              <h2>Sell an Item</h2>
      <p>To get your listing started, please provide the following information about the item you want to sell.</p>
        <b-form-group label="Brand" description="What is the brand of the product you want to sell?  (Fender, Moog, Zildijan, etc)">
          <b-form-input required v-model="form.brand"></b-form-input>
        </b-form-group>

        <b-form-group label="Model" description="What is the model name of the product? (Telecaster, Sub 37, 16in Super Crash)">
          <b-form-input required v-model="form.model"></b-form-input>
        </b-form-group>

        <!-- condition -->



        <b-form-group label="Item Condition" description="What is the condition of the item you want to sell?  Be as specific as possible so the buyer knows exactly what they are getting.">
          <b-form-select v-model="form.condition" :options="conditionOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="Listing Title" description="What do you want the name of your listing to be?  A good listing uses the item brand and model and a short description.">
          <b-form-input required v-model="form.title"></b-form-input>
        </b-form-group>

        <b-form-group label="Listing Description" description="Write a quick description describing the product and it's condition and any other information you think would be valuable to the buyer.">
          <b-form-input required v-model="form.description"></b-form-input>
        </b-form-group>

        <b-form-group label="Category" description="What category do you think this item belongs in?">
          <b-form-select v-model="form.category" :options="categoryOptions"></b-form-select>
        </b-form-group>

        <b-form-group label="Desired Price" description="What price do you want to sell this item for?">
          <b-form-input required v-model="form.price"></b-form-input>
        </b-form-group>

        <b-form-group label="Shipping Cost" description="What amount do you want from the buyer for shipping and handling?  Putting 0 in this field will list your item as having FREE SHIPPING which makes the listing more likely to sell faster.">
          <b-form-input required v-model="form.shipping"></b-form-input>
        </b-form-group>

        <b-button variant="primary" @click="submitListing">List My Item</b-button>


        <!-- <b-form-group label="Item Images" description="Please attach a few images detailing the product and any marks, damages, modifications or anything you think the potential buyer should know about.  Be specific, if you incorrectly list the condition of the item it can be held against you in any disputes!">
          <input id="image-selector" type="file">
          <b-button @click="selectedImages">Attach Images</b-button>

        </b-form-group> -->
        





        
      </b-form>

    </div>
  </div>
</template>

<script>

import {http} from '../util/axiosHttp';

export default {
  name: 'Sell',
  data(){ 
    return {
      APP_NAME: process.env.VUE_APP_NAME,
      showSellForm: false,
      form: {
        brand: '',
        model: '',
        used: '',
        year: '',
        title: '',
        description: '',
        shipping: '',
        price: '',
        condition: '',
      },
      conditionOptions: ["Brand New", "Mint", "Excellent", "Good", "Fair", "Poor", "Broken"],
      categoryOptions: ["Electric Guitars", "Acoustic Guitars", "Bass Guitars", "Amps", "Effects and Pedals", "Drums", "Cymbals", "Synthesizers", "Guitar Cabinets"]
    }
  },

  methods: {
    selectedImages: function() {
      let images = document.getElementById("image-selector").files[0];
      console.log("Selected these images" + images)
    },
    submitListing: async function() {
      try {
      var isUsed = false;
      if(this.form.condition != "Brand New"){
        isUsed = true;
      }
      var listing = await http().post(`${process.env.VUE_APP_API_URL}/api/listings/`, {
        brand: this.form.brand,
        model: this.form.model,
        condition: this.form.condition,
        used: isUsed,
        listingTitle: this.form.title,
        price: this.form.price,
        shippingPrice: this.form.shipping,
        description: this.form.description,
        category: (this.form.category).toLowerCase()
      })
      if(listing){
        console.log("added a new listing.")
      }

      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">

.sell-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  max-width: 900px;
  margin: 0px auto;
}

.sell-container h3 {
  font-size: 22px;
}
// .sell-container button {
//   outline: none;
//   color: white;
//   padding: 7px 28px;
//   border-radius: 5px;
//   background-color: $Secondary;
//   border: 1px solid $Secondary;
// }
// .sell-container button:hover {
//   outline: none;
//   color: $Secondary;
//   padding: 7px 28px;
//   border-radius: 5px;
//   background-color: white;
//   border: 1px solid $Secondary;
// }
</style>