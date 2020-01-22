import axios from "axios";

const twitchApiClient = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.VUE_APP_CLIENT_ID
  }
});

export default function install(Vue) {
  Vue.prototype.$get = resourse => twitchApiClient.get(resourse);

  Vue.prototype.$userInfo = () => axios.get("https://id.twitch.tv/oauth2/userinfo", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });

  Vue.prototype.$getFollowedStreams = fromId => twitchApiClient.get(`/users/follows?first=100&from_id=${fromId}`);

  Vue.prototype.$getStreamData = ids => {
    const query = ids
      .map(d => `user_id=${d.to_id}`)
      .join("&");

    return twitchApiClient.get(`/streams?user_id=${query}`);
  };

  Vue.prototype.$setToken = token => {
    twitchApiClient.defaults.headers = {
      Authorization: `Bearer ${token}`
    };
  };
}

export function isAuthenticated() {
  if (localStorage.getItem("id_token")) {
    return true;
  }

  return false;
}
