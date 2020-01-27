<template>
  <div id="chat-control">
    <div>
      <v-chip-group
        v-model="selectedChat"
        column
        active-class="primary"
      >
        <v-chip
          v-for="username in getSelectedStreams"
          :key="username"
          :value="username"
        >
          {{ username }}
        </v-chip>
      </v-chip-group>
    </div>

    <iframe
      v-for="username in getSelectedStreams"
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
      "getSelectedStreams"
    ])
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
