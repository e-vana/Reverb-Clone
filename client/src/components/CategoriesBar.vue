<template>
  <div class="categories-bar">
    <ul>
      <li v-for="(item, index) in catArray" :key="index"><router-link :to="item.link">{{ item.name }}</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CategoriesBar",
  data() {
    return{
      catArray: [
        {
          name: 'Electric Guitars',
          link: '/c/electric-guitars'
        },
        {
          name: 'Acoustic Guitars',
          link: '/c/acoustic-guitars'
        },
        {
          name: 'Bass Guitars',
          link: '/c/bass-guitars'
        },
        {
          name: 'Amps',
          link: '/c/amps'
        },
        {
          name: 'Effects and Pedals',
          link: '/c/effects-and-pedals'
        },
        {
          name: 'Drums',
          link: '/c/drums'
        },
        {
          name: 'Cymbals',
          link: '/c/cymbals'
        },
        

        {
          name: 'Synthesizers',
          link: '/c/synthesizers'
        },
        {
          name: 'Guitar Cabinets',
          link: '/c/guitar-cabinets'
        },
        
      ]
    }
  }
}
</script>

<style lang="scss">
.categories-bar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  border-top: 1px solid $BorderGray;
  border-bottom: 1px solid $BorderGray;
  font-size: $FontSmaller;
  text-align: center;
}
.categories-bar ul {
  padding: 0px;
  margin: 0px;
}
.categories-bar li {
  display: inline-block;
  margin: 0px 10px;
  transition: all .2s ease-in-out;
}
.categories-bar li:hover {
  cursor: pointer;
  color: $Secondary;
}


</style>