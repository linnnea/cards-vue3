<template>
  <button v-if="newPlayer" @click="startNewGame" class="button">
    Start Game
  </button>
  <button v-else @click="startNewGame" class="button">Restart Game</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    newPlayer: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const startNewGame = () => {
      ctx.emit("start-new-game");
    };

    return {
      startNewGame,
    };
  },
};
</script>

<style scoped>
.button {
  background: #212529;
  border: none;
  border-radius: 0.5em;
  color: #fff;
  padding: 1em 2em;
}
</style>