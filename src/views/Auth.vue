<template>
  <div>
    <p class="text-center">
      Authenticating...
    </p>
    <v-text-field color="success" loading disabled />
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

        if (key === "id_token" || key === "access_token") {
          if (key === "access_token") {
            this.$setToken(value);
          }

          localStorage.setItem(key, value);
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
