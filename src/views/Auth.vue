<template>
  <div>
    <p class="text-center">
      Authenticating...
    </p>

    <v-text-field
      color="success"
      loading
      disabled
    />
  </div>
</template>

<script>
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
            this.$store.commit("auth/setIdToken", value);
            break;
          case "access_token":
            this.$store.commit("auth/setAccessToken", value);
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
