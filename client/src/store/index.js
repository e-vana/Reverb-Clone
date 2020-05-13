import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    loading_percentage: 0,
    cart: [],
    userIsLoggedIn: false,
    currentUser: '',
    recentItems: [],
    watchList: [],
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
    SET_LOADING_PERCENTAGE: (state, payload) => {
      state.loading_percentage = payload;
    },
    SET_CART_ITEM: (state, payload) => {
      state.cart.push(payload)
    },
    REMOVE_CART_ITEM: (state, payload) => {
      //Where payload is index
      state.cart.splice(payload, 1)
    },
    SET_USER_LOGIN: (state) => {
      state.userIsLoggedIn = true;
    },
    SET_USER_LOGOUT: (state) => {
      state.userIsLoggedIn = false;
    },
    SET_CURRENT_USER: (state, payload) => {
      state.currentUser = payload;
    },
    SET_RECENT_ITEM: (state, payload) => {
      state.recentItems.push(payload);
    },
    SET_WATCH_LIST_ITEM: (state, payload) => {
      state.watchList.push(payload);
    }
  },
  actions: {
    setLoading: (context, payload) => {
      //Either set to TRUE || FALSE via payload
      context.commit('SET_LOADING', payload)
    },
    setLoadingPercentage: (context, payload) => {
      //Set state LOADING PERCENTAGE to a number
      context.commit('SET_LOADING_PERCENTAGE', payload)
    },
    setLoadingToggle: (context) => {
      context.commit("SET_LOADING", !context.state.loading)
    },
    addToCart: (context, payload) => {
      context.commit("SET_CART_ITEM", payload)
    },
    removeFromCart: (context, payload) => {
      context.commit("REMOVE_CART_ITEM", payload)
    },
    loginUser: (context) => {
      context.commit("SET_USER_LOGIN")
    },
    logoutUser: (context) => {
      context.commit("SET_USER_LOGOUT")
    },
    setUser: (context, payload) => {
      context.commit("SET_CURRENT_USER", payload.username)
    },
    setRecentItem: (context, payload) => {
      var arr = context.getters.getRecentItems;
      if (arr.filter(function(e) { return e._id === payload._id; }).length > 0) {
        console.log("this arr contains the element")
      } else {
        context.commit("SET_RECENT_ITEM", payload)
      }
    },
    setWatchListItem: (context, payload) => {
      var arr = context.getters.getWatchListItems;
      if (arr.filter(function(e) { return e._id === payload._id; }).length > 0) {
        console.log("this arr contains the element")
      } else {
        context.commit("SET_WATCH_LIST_ITEM", payload)
      }
    }
  },
  getters: {
    isLoading: (state) => {
      return state.loading;
    },
    getLoadingPercentage: (state) => {
      return state.loading_percentage;
    },
    getCart: (state) => {
      return state.cart;
    },
    getCartLength: (state) => {
      return state.cart.length;
    },
    isLoggedIn: (state) => {
      return state.userIsLoggedIn;
    },
    currentUser: (state) => {
      return state.currentUser;
    },
    getRecentItems: (state) => {
      return state.recentItems;
    },
    getWatchListItems: (state) => {
      return state.watchList;
    }
  }

})
