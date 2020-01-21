<template>
  <div>
    <StreamerBar :username="username" :profile-picture="pictureUrl" />
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
      authenticated: isAuthenticated()
    };
  },
  async mounted() {
    this.getUserInfo();
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
    getStreams() {

    }
  }
};
</script>
