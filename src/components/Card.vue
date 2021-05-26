<template>
  <div class="card" @click="selectCard" :class="flippedStyles">
    <div class="card-face is-front">
      <img :src="`/img/${value}.png`" :alt="value" />
    </div>
    <div class="card-face is-back"></div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "Card",
  props: {
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    matched: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    // eslint-disable-next-line vue/return-in-computed-property
    const flippedStyles = computed(() => {
      if (props.visible) {
        return "is-flipped";
      }
    });

    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      flippedStyles,
      selectCard,
    };
  },
};
</script>

<style scoped>
.card {
  position: relative;

  transform-style: preserve-3d;
  transition: 0.5s transform ease-in;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.7em;

  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;

  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face.is-front {
  /* background: #e4b5fc; */
  background: #fcf6b5;
  color: white;

  transform: rotateY(180deg);
}

/* .card-face.is-front:nth-child(even) {
  background: #fcf6b5;
}
.card-face.is-front:nth-child(odd) {
  background: #e4b5fc;
} */

img {
  width: 3.4em;
  height: 3.4em;
}

.card-face.is-back {
  /* background-image: url("https://media.giphy.com/media/yFGjHOQpwvkCLxnckP/giphy.gif");
  background-size: cover;
  background-repeat: no-repeat; */
  background: grey;
  color: white;
}

.checkmark {
  position: absolute;
  right: 0.3em;
  bottom: 0.2em;
}
</style>