<template>
  <div class="scenario-edit" :class="{edit: edit}">
    <div class="scenario__info">
      <div class="name-block">
        {{ scene.name }} <span v-if="edit">(редактируем...)</span> <br>
        <button @click="deleteHandler" v-if="edit">Удалить</button>
      </div>

      <button v-if="!edit" @click="edit = true"
              class="btn--tiny">
        <IconBase view-box="0 0 468.295 468.295" width="15" height="15">
          <IconPen />
        </IconBase>
      </button>
    </div>

    <div v-if="edit" class="scenario__edit-block">
      <div class="edit-block__name">
        <input type="text" v-model.trim="newName">
        <select v-model="section">
          <option v-for="el in categories" :value="el.name">{{el.fullName}}</option>
        </select>
        <div>
          <button @click="saveChange">Сохранить</button> &nbsp;&nbsp;
          <button @click="cancelHandler">Отменить</button>
        </div>

      </div>
      <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconPen from "./icons/IconPen";

  import CKEditor from 'ckeditor4-vue';
  import ScenariosService from "../services/ScenariosService";

  export default {
    name: "ScenarioEdit",
    components: {IconBase, IconPen, ckeditor: CKEditor.component},
    props: ['scene', 'categories'],
    data() {
      return {
        edit: false,
        newName: this.scene.name,
        section: this.scene.section,
        editorData: this.scene.content,
        editorConfig: {
          height: 400
        }
      }
    },
    methods: {
      async saveChange() {
        if(this.newName && this.section && this.editorData){
          let res = await ScenariosService.updateScenario({
            id: this.scene._id,
            name: this.newName,
            section: this.section,
            content: this.editorData
          });

          alert(res.data.message);

          if(res.data.success) {
            this.$emit('update-scenarios');
            this.edit = false;
          }
        }
        else alert('Поля не могут быть пустыми');
      },
      async deleteHandler() {
        if(!confirm('Точно удалить?')) return;
        let res = await ScenariosService.deleteScenario(this.scene._id);

        alert(res.data.message);

        if(res.data.success) this.$emit('update-scenarios');
      },
      cancelHandler() {
        if(!confirm('Точно отменить?')) return;

        this.newName = this.scene.name;
        this.editorData = this.scene.content;
        this.section = this.scene.section;
        this.edit = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
.scenario-edit{
  margin: 10px;

  &.edit{
    width: 100%;
    margin-bottom: 50px;
    border-bottom: 2px solid red;
    padding-bottom: 20px;

    .scenario__info{
      border: 1px solid red;
      margin-bottom: 20px;

      .name-block{
        padding: 10px;
        margin-right: 0;
        width: 100%;
        text-align: center;
      }
    }
  }

  .scenario__info{
    display: flex;
    align-items: center;

    .name-block{
      margin-right: 8px;

      span{
        color: red;
      }
    }
  }

  .scenario__edit-block{
    .edit-block__name{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
}
</style>