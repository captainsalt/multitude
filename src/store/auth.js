export default {
  namespaced: true,
  state: {
    accessToken: "",
    idToken: ""
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getIdToken: state => state.idToken
  },
  mutations: {
    setAccessToken: (state, payload) => state.accessToken = payload,
    setIdToken: (state, payload) => state.idToken = payload
  }
};
