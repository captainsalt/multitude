<template>
  <v-app>
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html, body {
  overflow-y: hidden !important;
}
</style>
