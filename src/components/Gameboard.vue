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
  grid-template-columns: repeat(4, 3em);
  grid-template-rows: repeat(4, 5.5em);
  grid-gap: 1.4em;
  justify-content: center;
  margin: auto 0;
}

@media only screen and (max-width: 375px) and (max-height: 566px) {
  .game-board {
    grid-template-columns: repeat(4, 2.5em);
    grid-template-rows: repeat(4, 4.5em);
    margin: 1em auto auto auto;
    height: 21em;
  }
}

.shuffle-card {
  transition: transform 0.8s ease-in;
}

@media screen and (min-width: 768px) {
  .game-board {
    grid-template-columns: repeat(8, 4em);
    grid-template-rows: repeat(2, 8em);
    align-content: center;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1024px) {
  .game-board {
    grid-template-columns: repeat(8, 5em);
    grid-template-rows: repeat(2, 10em);
  }
}
</style>