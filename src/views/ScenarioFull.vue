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

<style lang="scss" scoped>

</style>