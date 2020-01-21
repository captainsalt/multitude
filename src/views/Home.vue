<template>
  <div>
    Home page with streams
    <v-btn @click="getInfo">
      User info
    </v-btn>

    <p>{{ username }}</p>
    <p>{{ id }}</p>
  </div>
</template>

<script>
import { isAuthenticated } from "./../plugins/twitch-service";

export default {
  name: "Home",
  data() {
    return {
      id: null,
      username: ""
    };
  },
  async mounted() {
    if (isAuthenticated()) {
      const userInfo = await this.$userInfo();
      const { sub, preferred_username } = userInfo.data;

      this.id = sub;
      this.username = preferred_username;
    }
  },
  methods: {
    async getInfo() {
      await this.$userInfo();
    }
  }
};
</script>
