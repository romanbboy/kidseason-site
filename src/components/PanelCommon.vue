<template>
  <div class="common-block">
    <p class="bigP fz-24 ff-kosko tac mb-20">Общие настройки</p>

    <form @submit.prevent="addCategory" class="form-add form-add_category">
      <p class="fz-20 mb-20 tac">Добавить категорию</p>

      <div class="form-control">
        <label>Какие вообще есть категории:</label>
        <select v-model="selectedCategory">
          <option value="">Не выбрано</option>
          <option v-for="el in categories" :value="el._id">{{ el.fullName }}</option>
        </select> &nbsp; -
        <button @click.prevent="removeCategory">Удалить выбранную категорию</button>
      </div>

      <div class="form-control">
        <label>Название категории (на русском)</label>
        <input type="text" v-model.trim="formAddCategory.fullName">
      </div>

      <div class="actions">
        <button type="submit">Добавить</button>
      </div>
    </form>
  </div>
</template>

<script>
import CategoriesService from "@/services/CategoriesService";

export default {
  name: 'PanelCommon',
  data: () => ({
    formAddCategory: {
      fullName: ''
    },
    selectedCategory: ''
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    // category
    async addCategory() {
      if (this.formAddCategory.fullName) {
        const res = await CategoriesService.addCategory({
          fullName: this.formAddCategory.fullName
        });

        alert(res.data.message);

        if(res.data.success) {
          const response = await CategoriesService.fetchCategories();
          this.$store.dispatch('setCategories', response.data.categories);
          this.formAddCategory = {name: '', fullName: ''}
        }
      }
      else alert('Заполни все поля')
    },
    async removeCategory() {
      if (this.selectedCategory) {
        const res = await CategoriesService.removeCategory(this.selectedCategory);

        alert(res.data.message)

        if(res.data.success) {
          const response = await CategoriesService.fetchCategories();
          this.$store.dispatch('setCategories', response.data.categories);
          this.selectedCategory = '';
        }
      }
    }
  }
}
</script>

<style scoped>

</style>