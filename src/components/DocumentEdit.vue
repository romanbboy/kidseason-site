<template>
  <div class="document-edit">
    <div class="name-block">
      <input v-if="edit" type="text" v-model="name">
      <span v-else>{{ name }}</span>
    </div>


    <div v-if="edit">
      <button @click="saveChange" class="button">ok</button> &nbsp;&nbsp;
      <button @click="deleteHandler" class="button">удалить</button>
    </div>


    <button v-else
            @click="editDoc"
            class="button button_empty">
      <IconBase view-box="0 0 468.295 468.295"
                width="15"
                height="15"
      >
        <IconPen />
      </IconBase>
    </button>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconPen from "./icons/IconPen";

  export default {
    name: "DocumentEdit",
    components: {IconBase, IconPen},
    props: ['doc'],
    data() {
      return {
        edit: false,
        name: this.doc.name,
        id_doc: this.doc.id_doc
      }
    },
    methods: {
      editDoc() {
        this.edit = true;
      },
      saveChange() {
        console.log('-----> ', this.id_doc, this.name);
        this.edit = false;
      },
      deleteHandler() {
        if(!confirm('Точно удалить?')) return;
        console.log('-----> ', this.id_doc);
        this.edit = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
.document-edit{
  margin: 10px;
  display: flex;
  align-items: center;

  .name-block{
    display: inline-block;
    margin-right: 8px;
  }
}
</style>