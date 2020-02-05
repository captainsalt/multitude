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
      const redirectUri = `${window.location.origin}/auth`;
      const redirectUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token+id_token&scope=openid`;
      window.location.href = redirectUrl;
    }
  }
};
</script>

<style>
</style>
