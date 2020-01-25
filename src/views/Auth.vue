<template>
  <div>
    <p class="text-center">
      Authenticating...
    </p>
    <v-text-field color="success" loading disabled/>
  </div>
</template>

<script>
import { setAccessToken } from "@/services/twitch-service.js";

export default {
  mounted() {
    if (location.hash) {
      const params = location.hash
        .split("#")[1]
        .split("&");

      for (const param of params) {
        const [key, value] = param.split("=");

        switch (key) {
          case "id_token":
            this.$store.commit("setIdToken", value);
            break;
          case "access_token":
            this.$store.commit("setAccessToken", value);
            setAccessToken(value);
            break;
          default:
            break;
        }
      }

      this.$router.push("/");
    }
    else {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>
