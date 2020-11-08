<template>
  <div id="ScenarioPage">
    <div v-if="!section" class="empty-block">Выберите раздел слева</div>
    
    <div v-else>
      <div v-if="!nameScenario" class="scenario-list">
        <ScenarioBlock v-for="el in scenarios"
                       :scenario="el"
                       :key="el._id"/>
      </div>

      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import ScenarioBlock from '../components/ScenarioBlock'
  import ScenariosService from "../services/ScenariosService";

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
      scenarios() {
        return this.$store.getters.scenariosCategory(this.section)
      }
    },
    methods: {
      async getScenarios () {
        const response = await ScenariosService.fetchScenarios();
        await this.$store.dispatch('setScenarios', response.data.scenarios);

        let categories = [...new Set(response.data.scenarios.map(item => item.section))];
        let aside = categories.map(el => ({
            name: this.$store.getters.getFullNameCategory(el),
            section: el
        }));

        this.$store.dispatch('setAside', {aside, component: 'Scenario'})
      }
    },
    mounted () {
      this.getScenarios();
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