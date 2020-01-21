<template>
  <div>
    <v-btn block @click="oauth">
      Log in with Twitch
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async oauth() {
      window.location.href = process.env.VUE_APP_AUTH_URL;
    }
  }
};
</script>

<style>
</style>
