<template>
  <div class="scenario-content">
    <h3 class="mb-3 text-center">{{ scene.name }}</h3>
    <div v-html="scene.content"></div>
  </div>
</template>

<script>
  export default {
    name: "ScenarioFull",
    computed: {
      scene() {
        if(this.$store.getters.allScenarios.length) {
          this.$store.dispatch('showAside', false)
          return this.$store.getters.getScenario(this.$route.params['nameScenario'])
        } else {
          return {name: '', content: ''}
        }
      }
    }
  }
</script>

<style lang="scss" scoped >
  .scenario-content{
    padding: 25px 15px;
    background: rgba(255, 255, 255, .7);
    border-radius: 4px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    /deep/ img {
      max-width: 100%;
    }

    /deep/ p {
      margin-bottom: 0;
    }
  }
</style>