import axios from "axios";
import store from "@/store/index";

const twitchApiClient = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.VUE_APP_CLIENT_ID,
    "Authorization": `Bearer ${store.getters.getAccessToken}`
  }
});

export const getUserInfo = () =>
  axios.get("https://id.twitch.tv/oauth2/userinfo", {
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`
    }
  });

export const getFollowedStreams = fromId => twitchApiClient.get(`/users/follows?first=100&from_id=${fromId}`);

export const getStreamStatus = followedStreams => {
  const query = followedStreams
    .map(followedStream => `user_id=${followedStream.to_id}`)
    .join("&");

  return twitchApiClient.get(`/streams?user_id=${query}`);
};

export const setAccessToken = token => {
  twitchApiClient.defaults.headers = {
    Authorization: `Bearer ${token}`
  };
};

export const isAuthenticated = () => {
  if (store.getters.getAccessToken) {
    return true;
  }

  return false;
};
