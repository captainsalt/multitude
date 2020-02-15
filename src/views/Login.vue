<template>
  <div class="button-container d-flex justify-center align-center">
    <v-btn
      class="primary"
      x-large
      @click="oauth"
    >
      Log in with Twitch
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async oauth() {
      const redirectUri = `${window.location.origin}/auth`;
      const redirectUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token+id_token&scope=openid`;
      window.location.href = redirectUrl;
    }
  }
};
</script>

<style>
.button-container {
  height: 100vh;
}
</style>
