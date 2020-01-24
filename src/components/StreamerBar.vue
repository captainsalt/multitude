<template>
  <nav>
    <v-navigation-drawer
      v-model="show"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="profilePicture" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item-group
        v-model="selected"
        dense
        multiple
        active-class="pink--text"
      >
        <v-list-item
          v-for="streamer in liveStreamers"
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
export default {
  props: {
    username: {
      "type": String,
      "default": ""
    },
    profilePicture: {
      "type": String,
      "default": require("@/assets/logo.png")
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    liveStreamers() {
      return this.$store.getters.getLiveUsers;
    },
    selected: {
      get() {
        return this.$store.getters.getSelectedStreams;
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
