<template>
  <div class="scenario-content">
    <p class="bigP">{{ scene.name }}</p>
    <div v-html="scene.content"></div>
  </div>
</template>

<script>
  export default {
    name: "ScenarioFull",
    data() {
      return {
        scene: this.$store.getters.getScenario(this.$route.params['section'], this.$route.params['nameScenario'])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scenario-content{
    .bigP{
      margin: 20px;
      font-size: 26px;
      font-family: 'Kosko';
      text-align: center;
    }
  }
</style>