<template>
  <footer>
    <canvas id="cnvWaveRings"></canvas>
    <p>Когда нибудь тут будут полезные ссылки</p>
  </footer>
</template>

<script>
  import cnvWaveRings from "@/utils/cnvWaveRings";

  export default {
    name: "TheFooter",
    mounted() {
      cnvWaveRings(3, 37, 2, 3, 8);
    }
  }
</script>

<style lang="scss" scoped>
  footer{
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: 'Kosko';
    border-top: var(--border-markup);
    background: linear-gradient(45deg, rgba(175, 167, 227, 0.8), rgba(211, 255, 232, 0.7));

    canvas {
      width: 140px;
      height: 100px;
    }
  }
</style>