<template>
  <div>
    <StreamerBar :username="username" :profile-picture="pictureUrl" />
    <v-btn href="/login">
      Login
    </v-btn>
  </div>
</template>

<script>
import { isAuthenticated } from "./../plugins/twitch-service";
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
      authenticated: isAuthenticated(),
      streamerNames: []
    };
  },
  async mounted() {
    await this.getUserInfo();
    await this.getStreams();
  },
  methods: {
    async getUserInfo() {
      if (isAuthenticated()) {
        const userInfo = await this.$userInfo();
        const { sub, preferred_username, pictureUrl } = userInfo.data;

        this.id = sub;
        this.username = preferred_username;
        this.pictureUrl = pictureUrl;
      }
    },
    async getStreams() {
      const followedStreams = await this.$getFollowedStreams(this.id);
      const streamStatus = await this.$getStreamData(followedStreams.data.data);
      this.streamerNames = streamStatus.data.data.map(u => u.user_name);
    }
  }
};
</script>
