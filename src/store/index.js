import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth.js";

Vue.use(Vuex);

const persistStatePlugin = createPersistedState({
  paths: [
    "auth.accessToken",
    "auth.idToken"
  ]
});

export default new Vuex.Store({
  state: {
    liveChannels: [],
    urlChannels: [],
    selectedChannels: []
  },
  getters: {
    liveChannels: state => state.liveChannels,
    urlChannels: state => state.urlChannels,
    selectedChannels: state => state.selectedChannels
  },
  mutations: {
    setLiveChannels: (state, payload) => state.liveChannels = payload,
    addLiveChannels: (state, payload) => state.liveChannels = state.liveChannels.concat(payload),
    setUrlChannels: (state, payload) => state.urlChannels = payload,
    addUrlChannel: (state, payload) => state.urlChannels = state.urlChannels.concat(payload),
    setSelectedChannels: (state, payload) => state.selectedChannels = payload
  },
  modules: {
    auth
  },
  plugins: [persistStatePlugin]
});
