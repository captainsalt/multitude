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
      const token = location.hash.split("=")[1];
      this.$setToken(token);
      localStorage.setItem("token", token);
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
