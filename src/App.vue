<template>
  <h1>Peek a Vue</h1>

  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </section>

  <h2>{{ status }}</h2>
  <button @click="shuffleCards">Shuffle 'em</button>
  <button @click="restartGame">Restart Game</button>
</template>

<script>
import _ from "lodash";
import Card from "./components/Card";
import { computed, ref, watch } from "vue";

export default {
  name: "App",
  components: {
    Card,
  },
  setup() {
    // sets reactive
    const cardList = ref([]);
    const userSelection = ref([]);

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return "You won!";
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;

      return remainingCards / 2;
    });

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    };

    const restartGame = () => {
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => {
        return { ...card, matched: false, position: index, visible: false };
      });
    };

    const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];

    cardItems.forEach((item) => {
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });

      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

    // for (let i = 0; i < 16; i++) {
    //   cardList.value.push({
    //     value: i,
    //     visible: false,
    //     position: i,
    //     matched: false,
    //   });
    // }

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if (
          userSelection.value[0].position === payload.position &&
          userSelection.value[0].faceValue === payload.faceValue
        ) {
          return;
        } else {
          userSelection.value[1] = payload;
        }
      } else {
        userSelection.value[0] = payload;
      }
    };

    // check if more than 2 cards selected
    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          // Check if cards a match
          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 1000);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true } // track deep value
    );

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      shuffleCards,
      restartGame,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}
</style>
