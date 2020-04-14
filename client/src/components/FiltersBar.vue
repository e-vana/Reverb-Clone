<template>
  <div class="filters-bar">

    <div>
      <b-form-checkbox variant="secondary" v-model="usedOnly" name="check-button" switch>
        Used Only
      </b-form-checkbox>
    </div>

    <div>
      <b-form-group class="mb-0">
        <b-form-radio-group>
          <b-form-radio v-model="selected" name="some-radios" value="mostRecent">Most Recent</b-form-radio>
          <b-form-radio v-model="selected" name="some-radios" value="priceLowToHigh">Price Low to High</b-form-radio>
          <b-form-radio v-model="selected" name="some-radios" value="priceHighToLow">Price High to Low</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>


  </div>
</template>

<script>
export default {
  name: "FiltersBar",
  data(){
    return {
      usedOnly: false,
      selected: '',
    }
  },
}
</script>

<style lang="scss">
.filters-bar {
  background-color: white;
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