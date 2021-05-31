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
  margin: 1em auto;
  background: var(--dark);
  border: none;
  border-radius: 5em;
  color: var(--light);
  padding: 1em 1.5em;
  cursor: pointer;
}

.button:hover {
  opacity: 0.9;
}

@media only screen and (max-width: 375px) and (max-height: 566px) {
  .button {
    margin: 2em auto 1em auto;
  }
}

@media screen and (min-width: 768px) {
  .button {
    margin: 2em auto;
  }
}
</style>