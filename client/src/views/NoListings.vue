<template>
  <div class="no-listings-container">
    <div>
      <h2>There doesnt appear to be any listings in {{ categoryString }}.</h2>
      <p>Be the first one to add a listing to this category by using the sell feature!</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "NoListings",
  computed:{
    categoryString() {
      var category = this.$route.params.category.split("-");
      var catString = category.join(" ");
      return catString;
    },
  }
}

</script>

<style>

.no-listings-container {
  text-align: center;
  display: flex;
  justify-content: center;
  height: 400px;
  align-items: center;
  padding: 40px;
}
</style>