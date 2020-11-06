<template>
  <div class="document-edit">
    <div class="name-block">
      <div v-if="edit">
        <input v-if="edit" type="text" v-model.trim="name">
        <select v-model="section">
          <option v-for="el in categories" :value="el.name">{{el.fullName}}</option>
        </select>
      </div>
      <span v-else>{{ name }}</span>
    </div>

    <div v-if="edit">
      <button @click="saveChange" class="button">ok</button> &nbsp;&nbsp;
      <button @click="deleteHandler" class="button">удалить</button>
    </div>


    <button v-else
            @click="edit = true"
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
  import DocumentsService from "../services/DocumentsService";

  export default {
    name: "DocumentEdit",
    components: {IconBase, IconPen},
    props: ['doc', 'categories'],
    data() {
      return {
        edit: false,
        section: this.doc.section,
        name: this.doc.name
      }
    },
    methods: {
      async saveChange() {
        if(this.name && this.section){
          let res = await DocumentsService.updateDocument({
            id: this.doc._id,
            name: this.name,
            section: this.section
          });

          alert(res.data.message);

          if(res.data.success) {
            this.$emit('update-documents');
            this.edit = false;
          }
        }
        else alert('Поля не могут быть пустыми');
      },
      async deleteHandler() {
        if(!confirm('Точно удалить?')) return;
        let res = await DocumentsService.deleteDocument(this.doc._id);

        alert(res.data.message);

        if(res.data.success) this.$emit('update-documents');
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