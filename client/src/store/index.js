import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    loading_percentage: 0,
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
    SET_LOADING_PERCENTAGE: (state, payload) => {
      state.loading_percentage = payload;
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
    }
  },
  getters: {
    isLoading: (state) => {
      return state.loading;
    },
    getLoadingPercentage: (state) => {
      return state.loading_percentage;
    }
  }

  // modules: {
  // }
})
