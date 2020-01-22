import axios from "axios";

const twitchApiClient = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.VUE_APP_CLIENT_ID
  }
});

export const getUserInfo = () => axios.get("https://id.twitch.tv/oauth2/userinfo", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});

export const getFollowedStreams = fromId => twitchApiClient.get(`/users/follows?first=100&from_id=${fromId}`);

export const getStreamStatus = ids => {
  const query = ids
    .map(d => `user_id=${d.to_id}`)
    .join("&");

  return twitchApiClient.get(`/streams?user_id=${query}`);
};

export const setToken = token => {
  twitchApiClient.defaults.headers = {
    Authorization: `Bearer ${token}`
  };
};

export const isAuthenticated = () => {
  if (localStorage.getItem("id_token")) {
    return true;
  }

  return false;
};
