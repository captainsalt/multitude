<template>
  <div>
    <v-btn @click="displayStreamSelect">
      Show
    </v-btn>

    <v-btn href="/login">
      Login
    </v-btn>

    <!-- stream area -->
    <div id="area-container" v-resize="setContainerHeight">
      <div id="stream-area">
        <StreamPlayer
          v-for="streamerUsername in getSelectedStreams"
          :key="streamerUsername"
          :streamer-username="streamerUsername"
        />
      </div>

      <div id="chat-area">
        <ChatPicker/>
      </div>
    </div>

    <StreamSelect
      ref="streamSelect"
      :username="username"
      :profile-picture="pictureUrl"
    />
  </div>
</template>

<script>
import * as twitch from "@/services/twitch-service.js";
import StreamSelect from "@/components/StreamSelect.vue";
import StreamPlayer from "@/components/StreamPlayer.vue";
import ChatPicker from "@/components/ChatPicker.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    StreamSelect,
    StreamPlayer,
    ChatPicker
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
      await this.getLiveStreams();
    }
  },
  methods: {
    ...mapMutations([
      "addLiveUsers"
    ]),
    async getLiveStreams() {
      for await (const liveUsers of twitch.getLiveStreams()) {
        this.addLiveUsers(liveUsers);
      }
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
