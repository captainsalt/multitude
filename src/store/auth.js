export default {
  namespaced: true,
  state: {
    accessToken: "",
    idToken: "",
    userId: "",
    username: "",
    pictureUrl: ""
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getIdToken: state => state.idToken,
    getUsername: state => state.username,
    getUserId: state => state.userId,
    getPictureUrl: state => state.getPictureUrl
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

      commit("setIdToken", id);
      commit("setUsername", preferred_username);
      commit("setPicureUrl", picture);
    }
  }
};
