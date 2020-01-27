<template>
  <nav>
    <v-navigation-drawer
      v-model="show"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="getPictureUrl || require('@/assets/logo.png')"/>
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
        active-class="pink--text"
        max="4"
      >
        <v-list-item
          v-for="streamer in getLiveUsers"
          :key="streamer.user_id"
          :value="streamer.user_name"
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ streamer.username }}</v-icon>
          </v-list-item-icon> -->

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
