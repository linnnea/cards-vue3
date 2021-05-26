<template>
  <Header />
  <Gameboard :cardList="cardList" :status="status" @flip-card="flipCard" />
  <Button :newPlayer="newPlayer" @start-new-game="startNewGame" />
  <Footer />
</template>

<script>
import { ref, watch } from "vue";
import createGame from "./features/createGame";
import createDeck from "./features/createDeck";
import rapDeck from "./data/rapDeck.json";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";
import Button from "./components/Button";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Gameboard,
    Button,
    Footer,
  },
  setup() {
    const { cardList } = createDeck(rapDeck);
    const {
      newPlayer,
      startGame,
      restartGame,
      matchesFound,
      status,
    } = createGame(cardList);
    const userSelection = ref([]);

    const startNewGame = () => {
      if (newPlayer) {
        startGame();
      } else {
        restartGame();
      }
    };

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

    // watch(matchesFound, currentValue => {
    //   if (currentValue === 8) {
    //     launchConfetti()
    //   }
    // })

    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 2000);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      startNewGame,
      newPlayer,
      matchesFound,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fdf4ff;
  /* padding-top: 3em; */
  color: #212529;
  height: 100vh;
}

h1 {
  margin-top: 0;
}

.game-board {
  display: grid;
  /* grid-template-columns: repeat(6, 8em);
  grid-template-rows: repeat(2, 14em); */
  grid-template-columns: repeat(4, 4.5em);
  grid-template-rows: repeat(4, 7.3em);
  grid-gap: 0.6em;
  justify-content: center;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
</style>

