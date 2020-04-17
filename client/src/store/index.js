import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    loading_percentage: 0,
    cart: []
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
      //where payload is index to be removed
      context.commit("REMOVE_CART_ITEM", payload)
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
    }
  }

})
