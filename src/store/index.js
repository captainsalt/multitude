import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistStatePlugin = createPersistedState({
  paths: [
    "accessToken",
    "idToken"
  ]
});

export default new Vuex.Store({
  state: {
    accessToken: "",
    idToken: "",
    liveUsers: []
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getIdToken: state => state.idToken,
    getLiveUsers: state => state.liveUsers
  },
  mutations: {
    setAccessToken: (state, payload) => state.accessToken = payload,
    setIdToken: (state, payload) => state.idToken = payload,
    setLiveUsers: (state, payload) => state.liveUsers = payload
  },
  actions: {
  },
  plugins: [persistStatePlugin]
});
