<template>
  <div class="video-edit">
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
      <button @click="saveChange" class="button">Ок</button> &nbsp;&nbsp;
      <button @click="deleteHandler" class="button">Удалить</button>
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
  import VideosService from "../services/VideosService";

  export default {
    name: "VideoEdit",
    components: {IconBase, IconPen},
    props: ['video', 'categories'],
    data() {
      return {
        edit: false,
        name: this.video.name,
        section: this.video.section
      }
    },
    methods: {
      async saveChange() {
        if(this.name && this.section){
          let res = await VideosService.updateVideo({
            id: this.video._id,
            name: this.name,
            section: this.section
          });

          alert(res.data.message);

          if(res.data.success) {
            this.$emit('update-videos');
            this.edit = false;
          }
        }
        else alert('Поля не могут быть пустыми');
      },
      async deleteHandler() {
        if(!confirm('Точно удалить?')) return;
        let res = await VideosService.deleteVideo(this.video._id);

        alert(res.data.message);

        if(res.data.success) this.$emit('update-videos');
      }
    }
  }
</script>

<style lang="scss" scoped>
.video-edit{
  margin: 10px;
  display: flex;
  align-items: center;

  .name-block{
    display: inline-block;
    margin-right: 8px;
  }
}
</style>