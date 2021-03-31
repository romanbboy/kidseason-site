<template>
  <div class="scenario-block">
    <p class="bigP fz-24 ff-kosko tac mb-20">Сценарии</p>

    <div class="form-add form-add_scenario">
      <h4 class="fz-20 mb-20 text-center cursor-pointer" @click="formAddScenario.show = !formAddScenario.show">Добавить сценарий</h4>

      <form id="form-scenario" v-if="formAddScenario.show">
        <div class="form-control">
          <label>Имя сценария</label>
          <input type="text" v-model="formAddScenario.name">
        </div>
        <div class="form-control mb-20">
          <label>Категория</label>
          <select v-model="formAddScenario.section">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="el in categories" :value="el.name">{{ el.fullName }}</option>
          </select>
        </div>
        <br>
        <div class="form-control">
          <ckeditor v-model="formAddScenario.content"></ckeditor>
        </div>

        <div class="actions">
          <button type="submit" @click.prevent="addScenario">Добавить</button>
        </div>
      </form>
    </div>

    <div class="panel-category">
      <div class="pc-wrap" v-for="(el, i) in scenarios" :key="i">
        <p class="fz-20">{{ el.name }}</p>
        <div class="list">
          <ScenarioEdit v-for="scenario in el.listScenarios"
                        @update-scenarios="getScenarios"
                        :scene="scenario"
                        :categories="categories"
                        :key="scenario._id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScenariosService from "@/services/ScenariosService";
import CKEditor from "ckeditor4-vue";
import ScenarioEdit from "@/components/ScenarioEdit";

export default {
  name: 'PanelScenarios',
  components: {
    ScenarioEdit,
    ckeditor: CKEditor.component
  },
  data: () => ({
    formAddScenario: {
      show: false,
      content: '',
      name: '',
      section: ''
    },
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    scenarios() {
      let allScenarios = this.$store.getters.allScenarios;
      let categories = [...new Set(allScenarios.map(item => item.section))];
      return categories.map(el => ({
        name: this.$store.getters.getFullNameCategory(el),
        listScenarios: this.$store.getters.scenariosCategory(el)
      }))
    }
  },
  methods: {
    // scenario
    async addScenario() {
      if (this.formAddScenario.name !== ''
          && this.formAddScenario.section !== ''
          && this.formAddScenario.content !== ''
      ) {
        let res = await ScenariosService.addScenario({
          name: this.formAddScenario.name,
          section: this.formAddScenario.section,
          content: this.formAddScenario.content
        });

        alert(res.data.message);

        if (res.data.success) {
          this.formAddScenario = {name: '', section: '', content: '', show: true}
          await this.getScenarios();
        }
      }
      else alert('Заполни все поля')
    },
    async getScenarios() {
      const response = await ScenariosService.fetchScenarios();
      await this.$store.dispatch('setScenarios', response.data.scenarios);
    },
  },
  async mounted() {
    await this.getScenarios();
  }
}
</script>

<style scoped>

</style>