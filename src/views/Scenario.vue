<template>
  <div id="ScenarioPage">
    <div v-if="!section" class="empty-block">Выберите раздел слева</div>
    
    <div v-else>
      <div v-if="!nameScenario" class="scenario-list">
        <ScenarioBlock v-for="(el, indx) in scenario"
                       :scenario="el"
                       :key="el.id_scene"/>
      </div>

      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import jsonData from '../db/scenario.json';
  import ScenarioBlock from '../components/ScenarioBlock'

  export default {
    name: "Scenario",
    components: {ScenarioBlock},
    computed: {
      section() {
        return this.$route.params['section'];
      },
      nameScenario() {
        return this.$route.params['nameScenario'];
      },
      scenario() {
        return this.$store.getters.listScenario(this.section)
      }
    },
    created() {
      this.$store.dispatch('setScenario', jsonData.scenario);

      let aside = jsonData.scenario.map(({section, name}) => ({section, name}));
      this.$store.dispatch('setAside', {aside, component: 'Scenario'})
    }
  }
</script>

<style lang="scss" scoped>
  #ScenarioPage{
    height: 100%;

    .scenario-list{
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
    }
  }
</style>