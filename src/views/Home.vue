<template>
  <div>
    <StreamSelect ref="streamSelect" :username="username" :profile-picture="pictureUrl"/>
    <v-btn @click="displayStreamSelect">
      Show
    </v-btn>

    <v-btn href="/login">
      Login
    </v-btn>

    <!-- stream area -->
    <div id="area-container" v-resize="containerHeight">
      <div id="stream-area">
        <StreamPlayer
          v-for="streamerUsername in getSelectedStreams"
          :key="streamerUsername"
          :streamer-username="streamerUsername"
        />
      </div>

      <div id="chat-area">
        <ChatControl/>
      </div>
    </div>
  </div>
</template>

<script>
import * as twitch from "@/services/twitch-service.js";
import StreamSelect from "@/components/StreamSelect.vue";
import StreamPlayer from "@/components/StreamPlayer.vue";
import ChatControl from "@/components/ChatControl.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    StreamSelect,
    StreamPlayer,
    ChatControl
  },
  data() {
    return {
      id: null,
      username: "",
      pictureUrl: ""
    };
  },
  computed: {
    ...mapGetters([
      "getSelectedStreams"
    ])
  },
  async mounted() {
    if (twitch.isAuthenticated()) {
      await this.getUserInfo();
      await this.getStreams();
    }
  },
  methods: {
    async getUserInfo() {
      const userInfo = await twitch.getUserInfo();
      const { sub, preferred_username, pictureUrl } = userInfo.data;

      this.id = sub;
      this.username = preferred_username;
      this.pictureUrl = pictureUrl;
    },
    async getStreams() {
      const followedStreams = await twitch.getFollowedStreams(this.id);
      const streamStatus = await twitch.getStreamStatus(followedStreams.data.data);
      this.$store.commit("setLiveUsers", streamStatus.data.data);
    },
    containerHeight() {
      const areaContainer = this.$el.querySelector("#area-container");

      areaContainer.style.height = `calc(100vh - ${areaContainer.offsetTop}px - 12px)`;
      areaContainer.style.width = "calc(100vw - 24px)";
    },
    displayStreamSelect() {
      this.$refs.streamSelect.$data.show = !this.$refs.streamSelect.$data.show;
    }
  }
};
</script>

<style scoped>
#area-container {
  display: grid;
  grid-template: "stream chat" auto / 80% 20%;
  grid-gap: 5px;
}

#stream-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

#chat-area {
  height: 100%;
}
</style>
