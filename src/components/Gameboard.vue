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

  <h2>{{ status }}</h2>
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
    status: {
      type: String,
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
  grid-template-columns: repeat(4, 4.5em);
  grid-template-rows: repeat(4, 7.3em);
  grid-gap: 0.6em;
  justify-content: center;
}
</style>