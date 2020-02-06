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

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #282828;
}
</style>
