<template>
  <div>
    <StreamerBar :username="username" :profile-picture="pictureUrl" :streamers="streamerData" />
    <v-btn href="/login">
      Login
    </v-btn>
  </div>
</template>

<script>
import * as twitch from "@/services/twitch-service.js";
import StreamerBar from "@/components/StreamerBar.vue";

export default {
  name: "Home",
  components: {
    StreamerBar
  },
  data() {
    return {
      id: null,
      username: "",
      pictureUrl: "",
      streamerData: []
    };
  },
  async mounted() {
    await this.getUserInfo();
    await this.getStreams();
  },
  methods: {
    async getUserInfo() {
      if (twitch.isAuthenticated()) {
        const userInfo = await twitch.getUserInfo();
        const { sub, preferred_username, pictureUrl } = userInfo.data;

        this.id = sub;
        this.username = preferred_username;
        this.pictureUrl = pictureUrl;
      }
    },
    async getStreams() {
      const followedStreams = await twitch.getFollowedStreams(this.id);
      const streamStatus = await twitch.getStreamStatus(followedStreams.data.data);
      this.streamerData = streamStatus.data.data;
    }
  }
};
</script>
