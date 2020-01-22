import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistStatePlugin = createPersistedState({
  paths: [
    "access_token",
    "id_token"
  ]
});

export default new Vuex.Store({
  state: {
    access_token: "",
    id_token: ""
  },
  getters: {
    getAccessToken: state => state.access_token,
    getIdToken: state => state.id_token
  },
  mutations: {
    setAccessToken: (state, payload) => state.access_token = payload,
    setIdToken: (state, payload) => state.id_token = payload
  },
  actions: {
  },
  plugins: [persistStatePlugin]
});
