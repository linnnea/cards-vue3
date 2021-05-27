<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="selectCard"
    />
  </transition-group>
</template>

<script>
import Card from "./Card";

export default {
  name: "Gameboard",
  props: {
    cardList: {
      type: Array,
      required: true,
    },
  },
  components: {
    Card,
  },
  setup(props, ctx) {
    const selectCard = (payload) => {
      ctx.emit("flip-card", payload);
    };

    return { selectCard };
  },
};
</script>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 3.5em);
  grid-template-rows: repeat(4, 6.5em);
  grid-gap: 1.4em;
  justify-content: center;
  margin-top: 2em;
}

.shuffle-card {
  transition: transform 0.8s ease-in;
}

@media screen and (min-width: 1024px) {
  .game-board {
    grid-template-columns: repeat(8, 6em);
    grid-template-rows: repeat(2, 10em);
    align-content: center;
    margin: 1em 0;
  }
}
</style>