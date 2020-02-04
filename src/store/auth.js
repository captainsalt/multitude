export default {
  namespaced: true,
  state: {
    accessToken: null,
    idToken: null,
    userId: null,
    username: null,
    pictureUrl: null
  },
  getters: {
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    username: state => state.username,
    userId: state => state.userId,
    pictureUrl: state => state.getPictureUrl
  },
  mutations: {
    setAccessToken: (state, payload) => state.accessToken = payload,
    setIdToken: (state, payload) => state.idToken = payload,
    setUsername: (state, payload) => state.username = payload,
    setUserId: (state, payload) => state.userId = payload,
    setPicureUrl: (state, payload) => state.pictureUrl = payload
  },
  actions: {
    setUser({ commit }, userObject) {
      const { sub: id, preferred_username, picture } = userObject;

      commit("setUserId", id);
      commit("setUsername", preferred_username);
      commit("setPicureUrl", picture);
    },
    clearAuth({ commit }) {
      commit("setAccessToken", null);
      commit("setIdToken", null);
      commit("setUserId", null);
      commit("setUsername", null);
      commit("setPicureUrl", null);
    }
  }
};
