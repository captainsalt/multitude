import axios from "axios";
import store from "@/store/index";

const twitchApiClient = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.VUE_APP_CLIENT_ID,
    "Authorization": `Bearer ${store.getters.getAccessToken}`
  }
});

const getFollowedStreams = (fromId, cursor) => {
  let requestUrl = `/users/follows?first=100&from_id=${fromId}`;

  if (cursor) {
    requestUrl = `${requestUrl}&after=${cursor}`;
  }

  return twitchApiClient.get(requestUrl);
};

const getStreamStatus = followedStreams => {
  const query = followedStreams
    .map(followedStream => `user_id=${followedStream.to_id}`)
    .join("&");

  return twitchApiClient.get(`/streams?${query}`);
};

export const getUserInfo = () =>
  axios.get("https://id.twitch.tv/oauth2/userinfo", {
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`
    }
  });

export async function *getLiveStreams() {
  const userInfo = await getUserInfo();
  const { sub: id } = userInfo.data;
  let cursor = null;

  while (true) {
    const followedStreams = await getFollowedStreams(id, cursor);
    const {
      data: {
        data: followData,
        pagination
      }
    } = followedStreams;

    cursor = pagination.cursor;
    const liveChannels = (await getStreamStatus(followData)).data.data;

    yield liveChannels;

    if (followData.length < 100) {
      break;
    }
  }
}

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
