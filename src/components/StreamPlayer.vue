<template>
  <div :id="streamerUsername" />
</template>

<script>
export default {
  props: {
    streamerUsername: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.player = new Twitch.Player(this.streamerUsername, {
      width: "auto",
      height: "auto",
      channel: this.streamerUsername
    });
  }
};
</script>

<style>
</style>
