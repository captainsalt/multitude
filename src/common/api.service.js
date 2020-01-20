import axios from "axios";

export default function install(Vue) {
  axios.defaults.baseURL = "https://api.twitch.tv/helix";
  axios.defaults.headers = {
    "Client-ID": process.env.VUE_APP_CLIENT_ID
  };

  Vue.prototype.$get = resourse => axios.get(resourse);

  Vue.prototype.$setToken = token => {
    Vue.axios.defaults.headers = {
      "Authorization: ": `Token: ${token}`
    };
  };
}
