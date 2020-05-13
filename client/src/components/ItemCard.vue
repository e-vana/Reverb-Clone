<template>
  <router-link :to="itemLink">
    <div class="item-card">
      <div class="item-card-header">
        <img :src="imageUrl" alt="">
      </div>
      <div class="item-card-footer" >
        <div class="item-card-footer-content">
            <h5>{{ itemName }}</h5>


        </div>
        <div class="item-card-footer-content item-card-pricing">
          <div class="item-card-price">
            <b>${{ price }}</b>
          </div>
          <div>
            {{ condition }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    imageUrl: String,
    price: Number,
    shippingPrice: Number,
    condition: String,
    itemName: String,
    itemLink: String
  }
}
</script>

<style>

.item-card {
  min-width: 250px;
  max-width: 250px;
  margin-right: 20px;
  /* margin-bottom: 20px; */
  background-color: white;
}
.item-card-header img {
  width: 100%;
}
.item-card-footer {
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  height: 130px;
  padding: 10px 20px;

}

.item-card-footer-content {
  width: 250px; 
}
.item-card-footer-content h5 {
  text-align: center;
}
.item-card-pricing {
  display: flex;
  justify-content: space-between;
}
.item-card-price {
  font-size: 18px;
}
</style>