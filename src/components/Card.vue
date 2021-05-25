<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      {{ value }} - {{ position }} - {{ matched }}
    </div>
    <div v-else class="card-face is-back">Back</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
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
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      selectCard,
    };
  },
};
</script>

<style scoped>
.card {
  display: grid;
  place-items: center;

  position: relative;
}

.card-face {
  position: absolute;

  width: 100%;
  height: 100%;
}

.card-face.is-front {
  background: red;
  color: white;
}

.card-face.is-back {
  background: black;
  color: white;
}
</style>