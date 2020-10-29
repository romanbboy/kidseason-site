<template>
  <div class="scenario-edit" :class="{edit: edit}">
    <div class="scenario__info">
      <div class="name-block">{{ scene.name }} <span v-if="edit">(редактируем...)</span></div>

      <button v-if="!edit" @click="edit = true"
              class="button button_empty">
        <IconBase view-box="0 0 468.295 468.295"
                  width="15"
                  height="15"
        >
          <IconPen />
        </IconBase>
      </button>
    </div>

    <div v-if="edit" class="scenario__edit-block">
      <div class="edit-block__name">
        <input type="text" v-model="newName">
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

  export default {
    name: "ScenarioEdit",
    components: {IconBase, IconPen, ckeditor: CKEditor.component},
    props: ['scene'],
    data() {
      return {
        edit: false,
        newName: this.scene.name,
        editorData: this.scene.content,
        editorConfig: {
          height: 400
        }
      }
    },
    methods: {
      saveChange() {
        console.log('-----> ', this.newName, this.editorData);
        this.edit = false;
      },
      cancelHandler() {
        this.newName = this.scene.name;
        this.editorData = this.scene.content;
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