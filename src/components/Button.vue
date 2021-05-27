<template>
  <button v-if="newPlayer" @click="startNewGame" class="button">
    Start Game
  </button>
  <button v-else @click="startNewGame" class="button">Restart Game</button>
</template>

<script>
import confetti from "canvas-confetti";

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

      setTimeout(() => {
        confetti.reset();
      }, 1000);
    };

    return {
      startNewGame,
    };
  },
};
</script>

<style scoped>
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10em;
  height: 3.3em;
  margin: 0 auto;
  background: var(--dark);
  border: none;
  border-radius: 5em;
  color: var(--light);
  padding: 1em 2em;
  margin-bottom: 2em;
}
</style>