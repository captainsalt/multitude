import axios from "axios";
import store from "@/store/index";

const getAxiosConfig = () => ({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.VUE_APP_CLIENT_ID,
    "Authorization": `Bearer ${store.state.auth.accessToken}`
  }
});

export function getFollowedStreams(fromId, cursor) {
  let requestUrl = `/users/follows?first=100&from_id=${fromId}`;

  if (cursor)
    requestUrl = `${requestUrl}&after=${cursor}`;

  return axios.get(requestUrl, getAxiosConfig());
}

export function getStreamStatus(followedStreams) {
  const query = followedStreams
    .map(followedStream => `user_id=${followedStream.to_id}`)
    .join("&");

  return axios.get(`/streams?${query}`, getAxiosConfig());
}

export function getUserInfo() {
  return axios.get("https://id.twitch.tv/oauth2/userinfo", {
    headers: {
      Authorization: `Bearer ${store.state.auth.accessToken}`
    }
  });
}

export async function getLiveChannels() {
  const id = store.state.auth.userId;
  let cursor = null;
  let channels = [];

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

    channels = channels.concat(liveChannels);

    if (followData.length < 100)
      break;
  }

  return channels;
}

export async function isAuthenticated() {
  if (store.state.auth.accessToken)
    return true;

  await store.dispatch("auth/clearAuth");
  return false;
}
