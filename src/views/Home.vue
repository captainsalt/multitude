<template>
  <div>
    <v-btn @click="displayStreamSelect">
      Show
    </v-btn>

    <v-btn href="/login">
      Login
    </v-btn>

    <div id="area-container" v-resize="setContainerHeight">
      <div id="stream-area">
        <StreamPlayer
          v-for="streamerUsername in selectedChannels"
          :key="streamerUsername"
          :streamer-username="streamerUsername"
        />
      </div>

      <div id="chat-area">
        <ChatPicker/>
      </div>
    </div>

    <StreamSelect ref="streamSelect"/>
  </div>
</template>

<script>
import * as twitch from "@/services/twitch-service.js";
import StreamSelect from "@/components/StreamSelect.vue";
import StreamPlayer from "@/components/StreamPlayer.vue";
import ChatPicker from "@/components/ChatPicker.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    StreamSelect,
    StreamPlayer,
    ChatPicker
  },
  computed: {
    ...mapGetters([
      "selectedChannels"
    ])
  },
  async mounted() {
    this.getUrlChannels();
    if (await twitch.isAuthenticated()) {
      await this.getUserInfo();
      await this.getLiveChannels();
      setInterval(() => {
        this.getLiveChannels();
      }, 60000);
    }
  },
  methods: {
    ...mapMutations([
      "setLiveChannels",
      "setUrlChannels",
      "setSelectedChannels"
    ]),
    ...mapActions("auth", [
      "setUser"
    ]),
    getUrlChannels() {
      if (window.location.pathname === "/") return;

      const filter = new Set(window.location.pathname.split("/"));
      filter.delete("");

      this.setUrlChannels([...filter]);
      this.setSelectedChannels([...filter].splice(0, 4));
    },
    async getUserInfo() {
      const user = (await twitch.getUserInfo()).data;
      this.setUser(user);
    },
    async getLiveChannels() {
      const channels = await twitch.getLiveChannels();
      this.setLiveChannels(channels);
    },
    setContainerHeight() {
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
  grid-template: "stream chat" auto / 75% 25%;
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
