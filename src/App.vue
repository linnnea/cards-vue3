<template>
  <div class="container">
    <Header />
    <Gameboard :cardList="cardList" @flip-card="flipCard" />
    <Button :newPlayer="newPlayer" @start-new-game="startNewGame" />
    <Footer :status="status" />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { launchConfetti } from "./utilities/confetti";
import rapDeck from "./data/rapDeck.json";
import createGame from "./features/createGame";
import createDeck from "./features/createDeck";
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
  mounted() {
    this.startGame();
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

    watch(matchesFound, (currentValue) => {
      if (currentValue === 8) {
        launchConfetti();
      }
    });

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
            }, 1000);
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
  background: var(--light);
  color: var(--dark);
  height: 100vh;
}

:root {
  --light: #fdf4ff;
  --dark: #212529;
  --front: #fcf9b5;
  --back: #5b6f5e;
  --accent: #ffbafc;

  --shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4em 1fr auto 4em;
  height: 100vh;
}

header,
footer {
  font-family: metalista-web, serif;
  font-size: 2.5rem;
}

@media only screen and (max-width: 375px) and (max-height: 566px) {
  header,
  footer {
    font-size: 1.5rem;
  }

  .container {
    grid-template-columns: 1fr;
    grid-template-rows: 2.5em auto auto 2.5em;
  }
}
</style>

