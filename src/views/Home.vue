<template>
  <div>
    Home page with streams
    <v-btn @click="getInfo">
      User info
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    async getInfo() {
      await this.$userInfo();
    }
  }
};
</script>
