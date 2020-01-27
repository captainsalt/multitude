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
    liveUsers: [],
    selectedStreams: []
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getIdToken: state => state.idToken,
    getLiveUsers: state => state.liveUsers,
    getSelectedStreams: state => state.selectedStreams
  },
  mutations: {
    setAccessToken: (state, payload) => state.accessToken = payload,
    setIdToken: (state, payload) => state.idToken = payload,
    setLiveUsers: (state, payload) => state.liveUsers = payload,
    addLiveUsers: (state, payload) => state.liveUsers = state.liveUsers.concat(payload),
    setSelectedStreams: (state, payload) => state.selectedStreams = payload
  },
  actions: {
  },
  plugins: [persistStatePlugin]
});
