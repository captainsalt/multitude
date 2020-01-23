import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistStatePlugin = createPersistedState({
  paths: [
    "accessToken",
    "idToken",
    "activeStreams"
  ]
});

export default new Vuex.Store({
  state: {
    accessToken: "",
    idToken: "",
    activeStreams: []
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getIdToken: state => state.idToken,
    getActiveStreams: state => state.activeStreams
  },
  mutations: {
    setAccessToken: (state, payload) => state.accessToken = payload,
    setIdToken: (state, payload) => state.idToken = payload,
    setActiveStreams: (state, payload) => state.activeStreams = payload
  },
  actions: {
  },
  plugins: [persistStatePlugin]
});
