<template>
  <div id="chat-control">
    <div>
      <v-chip-group
        v-model="selectedChat"
        column
        active-class="primary"
      >
        <v-chip
          v-for="username in selectedStreams"
          :key="username"
          :value="username"
        >
          {{ username }}
        </v-chip>
      </v-chip-group>
    </div>

    <iframe
      v-for="username in selectedStreams"
      :key="username"
      :hidden="!isSelected(username)"
      :src="getLink(username)"
      frameborder="0"
      scrolling="yes"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedChat: ""
    };
  },
  computed: {
    ...mapGetters([
      "selectedStreams"
    ])
  },
  watch: {
    // Select first chat if users removes the current selected chat
    selectedChat(val) {
      if (!val) {
        this.selectedChat = this.selectedStreams[0];
      }
    },
    // Auto select the chat for the first stream added
    selectedStreams(streamers) {
      if (!this.selectedChat) {
        this.selectedChat = streamers[0];
      }
    }
  },
  methods: {
    getLink(username) {
      return `https://www.twitch.tv/embed/${username}/chat?darkpopout`;
    },
    isSelected(username) {
      return this.selectedChat === username;
    }
  }
};
</script>

<style scoped>
#chat-control {
  display: grid;
  height: 100%;
  grid-template:
    "buttons" auto
    "chat" 1fr / 1fr;
}

iframe {
  height: 100%;
  width: 100%;
}
</style>
