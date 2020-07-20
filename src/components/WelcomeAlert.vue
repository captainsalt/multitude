<template>
  <v-alert
    color="white"
    text
  >
    <p>
      Welcome to Multitide. This site allows you to watch multiple streams at once!
    </p>

    <p>
      You can add streams by adding the desired channel username to the url separated by forward slashes:
      <br>
      <a :href="exampleUrl">{{ exampleUrl }} </a>
    </p>

    <p>
      You can add an infinite amount of streams, but you can only view up to 4 streams at one time
    </p>

    <p>
      <!-- eslint-disable-next-line -->
      You can pick and choose between the streams currently showing using the <v-btn icon class="primary"><v-icon>mdi-menu</v-icon></v-btn> button in the top left
    </p>

    <p>
      If desired, you can sign in with your Twitch account to be able to pick from live followed channelss
    </p>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      exampleUrl: `${window.location.origin}/captainsalt/bobross/dallas`
    };
  }
};
</script>
