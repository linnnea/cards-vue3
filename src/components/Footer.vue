<template>
  <footer>
    <span>Pairs</span>
    <div class="value">{{ status }}</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    status: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0.4em;
  border-top: 1px solid #212529;
}

@media only screen and (max-width: 375px) and (max-height: 566px) {
  footer {
    padding: 0.5em 0.4em 0.3em 0.4em;
  }
}

@media screen and (min-width: 1440px) {
  footer {
    justify-content: space-around;
  }
}
</style>