<template>
  <nav>
    <v-navigation-drawer
      v-model="show"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="pictureUrl || require('@/assets/default-profile.png')"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>

      <v-list-item-group
        v-model="selected"
        dense
        multiple
        active-class="primary"
        max="4"
      >
        <v-subheader
          v-if="urlChannels.length"
          class="flex justify-center title"
        >
          Url Streams
        </v-subheader>

        <v-list-item
          v-for="username in urlChannels"
          :key="username"
          :value="username"
        >
          {{ username }}
        </v-list-item>

        <v-subheader
          v-if="liveChannels.length"
          class="flex justify-center title"
        >
          Live Channels
        </v-subheader>

        <v-list-item
          v-for="streamer in liveChannels"
          :key="streamer.user_id"
          :value="streamer.user_name"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ streamer.user_name }}
            </v-list-item-title>

            <v-list-item-subtitle class="truncate">
              {{ streamer.title }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="username" block>
            Logout
          </v-btn>
          <v-btn v-else block>
            Login
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters([
      "liveChannels",
      "urlChannels",
      "selectedChannels"
    ]),
    ...mapGetters("auth", [
      "username",
      "pictureUrl"
    ]),
    selected: {
      get() {
        return this.selectedChannels;
      },
      set(val) {
        this.$store.commit("setSelectedChannels", val);
      }
    }
  }
};
</script>

<style>
</style>
