<template>
  <div>
    <div class="navigation">

      <div class="navigation-brand">
        <router-link to="/">{{ APP_NAME }}</router-link>
      </div>

      <div class="navigation-search">
        <b-input type="text" v-model="search" placeholder="Search for used & new music gear..."></b-input>
        <b-button><b-icon icon="search" ></b-icon></b-button>
      </div>


      <div class="navigation-links">
        <div class="navigation-sell">
          <router-link to="/sell"><b-button>SELL</b-button></router-link>
        </div>


        <div class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="star"></b-icon>
            <p>Wish List</p>
          </div>
        </div>

        <div class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="grid"></b-icon>
            <p>My Feed</p>
          </div>
        </div>

        <router-link to="/cart">
        <div class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="bag"></b-icon>
            <p>Cart ({{ this.$store.getters.getCartLength }})</p>
          </div>
        </div>
        </router-link>

        <div class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="bell"></b-icon>
            <p>Notifications</p>
          </div>
        </div>

        <router-link to="/login">
        <div v-if="!$store.getters.isLoggedIn" class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="person-bounding-box"></b-icon>
            <p>Login</p>
          </div>
        </div>
        </router-link>

        <router-link to="/user">
        <div v-if="$store.getters.isLoggedIn" class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="person"></b-icon>
            <p>User</p>
          </div>
        </div>
        </router-link>

        <div @click="signOut" v-if="$store.getters.isLoggedIn" class="navigation-link" >
          <div class="navigation-link-content">
            <b-icon font-scale="2" icon="dash-circle"></b-icon>
            <p>Sign Out</p>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      APP_NAME: process.env.VUE_APP_NAME,
      navLinks: [
        {
          name: 'Wish List',
          icon: 'star'
        },
        {
          name: 'My feed',
          icon: 'grid'
        },
        {
          name: `Cart`,
          icon: 'bag'
        },
        {
          name: 'Notification',
          icon: 'bell'
        },
        {
          name: 'User',
          icon: 'person'
        },
      ],
      search: '',
    }
  },
  methods: {
    signOut: function() {
      this.$store.dispatch("logoutUser");
    }
  }

}
</script>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width:100%; 

}
.navigation-links {
  display: flex;
  align-items: center;
}
.navigation-link {
  display: flex;
  justify-items: center;
  text-align: center;
  margin: 0px 10px;
  transition: all .2s ease-in-out;
}

.navigation-link:hover {
  color: lighten($FontColorPrimary, 30%)
}

.navigation-link-content {
  font-size: $FontSmallest;
}
.navigation-link-content p {
  margin: 0px;
}
.navigation-link:hover {
  // color: $FontColorPrimary;
  color: lighten($FontColorPrimary, 30%)
}

.navigation-search {
  display: flex;
  align-items: center;
  width: 50%;
}

.navigation-search input {
  // width: 600px;
  width: 100%;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 5px;
  margin-right: 5px;
}

.navigation-search button {
  background-color: $Secondary;
  outline: none;
  border: none;
  padding: 7px 14px;
  border-radius: 5px;
}
.navigation-search button:hover {
  background-color: lighten($Secondary, 10%);
}
.navigation-sell button {
  background-color: white;
  outline: none;
  border: 1px solid $Secondary;
  color: $Secondary;
  padding: 7px 28px;
  border-radius: 5px;
}
.navigation-sell button:hover {
  background-color: $Secondary;
  border: 1px solid $Secondary;
}

.navigation-brand {
  font-weight: bold;
  font-size: 18px;
}
</style>