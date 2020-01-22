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

      <v-list dense>
        <v-list-item
          v-for="streamer in streamers"
          :key="streamer.user_id"
          link
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ streamer.username }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content>
            <v-list-item-title>{{ streamer.user_name }}</v-list-item-title>
            {{ streamer.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
    },
    streamers: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style>
</style>
