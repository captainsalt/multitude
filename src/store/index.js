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
    liveUsers: [],
    urlUsers: [],
    selectedStreams: []
  },
  getters: {
    getLiveUsers: state => state.liveUsers,
    getUrlUsers: state => state.urlUsers,
    getSelectedStreams: state => state.selectedStreams
  },
  mutations: {
    setLiveUsers: (state, payload) => state.liveUsers = payload,
    addLiveUsers: (state, payload) => state.liveUsers = state.liveUsers.concat(payload),
    setUrlUsers: (state, payload) => state.urlUsers = payload,
    addUrlUser: (state, payload) => state.urlUsers = state.urlUsers.concat(payload),
    setSelectedStreams: (state, payload) => state.selectedStreams = payload
  },
  modules: {
    auth
  },
  plugins: [persistStatePlugin]
});
