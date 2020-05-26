import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth.js";

Vue.use(Vuex);

const persistStatePlugin = createPersistedState({
  paths: [
    "auth.accessToken",
    "auth.idToken"
  ],
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
    removeItem: key => Cookies.remove(key)
  }
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
