<template>
  <div class="scenario-block">
    <p class="bigP fz-24 ff-kosko tac mb-20">Методическая копилка</p>

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
        <div class="form-control mb-20">
          Это в методическую копилку? &nbsp; <input type="checkbox" :style="{width: 'auto'}" v-model="formAddScenario.methodical" />
        </div>
        <br>
        <div class="form-control">
          <ckeditor v-model="formAddScenario.content" :editor-url="editorUrl" :config="editorConfig"></ckeditor>
        </div>

        <div class="actions">
          <button type="submit" @click.prevent="addScenario">Добавить</button>
        </div>
      </form>
    </div>

    <div class="panel-category">
      <h3>Сценарии</h3>
      <div class="pc-wrap" v-for="(el, i) in scenarios" :key="i">
        <p class="fz-20">{{ el.name }}</p>
        <div class="list">
          <ScenarioEdit v-for="scenario in el.list"
                        @update-scenarios="getScenarios"
                        :scene="scenario"
                        :categories="categories"
                        :key="scenario._id"/>
        </div>
      </div>
    </div>

    <div class="panel-category">
      <h3>Методическая копилка</h3>
      <div class="pc-wrap" v-for="(el, i) in methodical" :key="i">
        <p class="fz-20">{{ el.name }}</p>
        <div class="list">
          <ScenarioEdit v-for="methodical in el.list"
                        @update-scenarios="getScenarios"
                        :scene="methodical"
                        :categories="categories"
                        :key="methodical._id"/>
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
      section: '',
      methodical: false
    },
    editorUrl: 'https://cdn.ckeditor.com/4.14.1/full-all/ckeditor.js',
    editorConfig: {
      height: 400
    }
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    scenarios() {
      return this.fetchData(false);
    },
    methodical() {
      return this.fetchData(true);
    }
  },
  methods: {
    // scenario
    async addScenario() {
      let {name, section, content, methodical} = this.formAddScenario;

      if (name !== '' && section !== '' && content !== '') {
        let res = await ScenariosService.addScenario({name, section, content, methodical});

        alert(res.data.message);

        if (res.data.success) {
          this.formAddScenario = {name: '', section: '', content: '', show: true, methodical: false}
          await this.getScenarios();
        }
      }
      else alert('Заполни все поля')
    },
    async getScenarios() {
      const response = await ScenariosService.fetchScenarios();
      await this.$store.dispatch('setScenarios', response.data.scenarios);
    },

    fetchData(methodical) {
      let data = this.$store.getters.allScenarios.filter(el => el.methodical === methodical);
      let categories = [...new Set(data.map(item => item.section))];
      return categories.map(el => ({
        name: this.$store.getters.getFullNameCategory(el),
        list: this.$store.getters.scenariosCategory(el).filter(el => el.methodical === methodical)
      }))
    }
  },
  async mounted() {
    await this.getScenarios();
  }
}
</script>

<style scoped>

</style>