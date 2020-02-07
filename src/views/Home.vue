<template>
  <div>
    <v-btn
      class="primary"
      icon
      @click="displayStreamSelect"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <div
      v-if="!selectedChannels.length"
      class="d-flex justify-center"
    >
      <WelcomeAlert/>
    </div>

    <div id="area-container" v-resize="setContainerHeight">
      <div id="stream-area" v-resize="fillStreamArea">
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
import WelcomeAlert from "@/components/WelcomeAlert.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    StreamSelect,
    StreamPlayer,
    ChatPicker,
    WelcomeAlert
  },
  computed: {
    ...mapGetters([
      "selectedChannels"
    ])
  },
  watch: {
    selectedChannels() {
      this.$nextTick(() => {
        this.fillStreamArea();
      });
    }
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
    fillStreamArea() {
      const streamPlayers = this.$el.querySelectorAll("#stream-area .stream");
      const maxWidth = this.$el.querySelector("#stream-area").offsetWidth;
      const ratio = 16 / 9;
      let width = "";
      let height = "";

      if (this.selectedChannels.length > 1) {
        const elementWidth = maxWidth * 0.45;

        width = `${elementWidth}px`;
        height = `${elementWidth / ratio}px`;
      }
      else {
        width = `${maxWidth}px`;
        height = `${maxWidth / ratio}px`;
      }

      for (const player of streamPlayers) {
        player.style.width = width;
        player.style.height = height;
      }
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
