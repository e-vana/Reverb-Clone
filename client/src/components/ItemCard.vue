<template>
  <!-- <b-card
    :title="itemName"
    :img-src="imageUrl"
    img-top
    title-tag="p"
    class="item-card"
  >
    <b-card-text>
      <p>
       ${{ price }}
      </p>
      <p>{{ condition }}</p>
    </b-card-text>

  </b-card> -->
  <div class="item-card">
    <div class="item-card-header">
      <img :src="imageUrl" alt="">
    </div>
    <div class="item-card-footer">
      <p>
        {{ itemName }}
      </p>
      <p>
        ${{ price }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item Card",
  props: {
    imageUrl: String,
    price: Number,
    condition: String,
    itemName: String
  }
}
</script>

<style>
.item-card h4 {
  font-size: 1rem;
}
.item-card-header img {
  max-height: 225px;
  max-width: 225px;
  width: 100%;
}
.item-card {
  flex: 0 0 auto;
  margin-right: 20px;
  max-width: 225px;
  display: flex;
  flex-wrap: wrap;
  /* align-content: space-between; */
  align-content: space-between;
}

</style>