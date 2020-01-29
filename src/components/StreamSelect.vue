<template>
  <nav>
    <v-navigation-drawer
      v-model="show"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="getPictureUrl || require('@/assets/default-profile.png')"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ getUsername }}</v-list-item-title>
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
          v-if="getUrlUsers.length"
          class="flex justify-center title"
        >
          Url Streams
        </v-subheader>

        <v-list-item
          v-for="username in getUrlUsers"
          :key="username"
          :value="username"
        >
          {{ username }}
        </v-list-item>

        <v-subheader
          v-if="getLiveUsers.length"
          class="flex justify-center title"
        >
          Live Channels
        </v-subheader>

        <v-list-item
          v-for="streamer in getLiveUsers"
          :key="streamer.user_id"
          :value="streamer.user_name"
        >
          <v-list-item-content>
            <v-list-item-title>{{ streamer.user_name }}</v-list-item-title>
            {{ streamer.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
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
      "getLiveUsers",
      "getUrlUsers",
      "getSelectedStreams"
    ]),
    ...mapGetters("auth", [
      "getUsername",
      "getPictureUrl"
    ]),
    selected: {
      get() {
        return this.getSelectedStreams;
      },
      set(val) {
        this.$store.commit("setSelectedStreams", val);
      }
    }
  }
};
</script>

<style>
</style>
