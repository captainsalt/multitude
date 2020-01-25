<template>
  <div id="chat-control">
    <div>
      Buttons
    </div>
    <iframe
      frameborder="0"
      scrolling="yes"
      src="https://www.twitch.tv/embed/hebo/chat"
    />
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
#chat-control {
  display: grid;
  height: 100%;
  grid-template:
    "buttons" auto
    "chat" 1fr / 1fr;
}
iframe {
  height: 100%;
}
</style>
