<template>
  <div :id="streamerUsername" class="stream"/>
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
  computed: {
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.player = new Twitch.Player(this.streamerUsername, {
      width: "100%",
      height: "100%",
      channel: this.streamerUsername
    });
  }
};
</script>

<style>
.stream {
  width: 450px;
  height: 253.5px;
  margin: 1px;
}

.stream iframe {
  border: 1px solid #9147ff;
}
</style>
