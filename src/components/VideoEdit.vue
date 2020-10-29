<template>
  <div class="video-edit">
    <div class="name-block">
      <input v-if="edit" type="text" v-model="name">
      <span v-else>{{ name }}</span>
    </div>

    <div v-if="edit">
      <button @click="saveChange" class="button">Ок</button> &nbsp;&nbsp;
      <button @click="deleteHandler" class="button">Удалить</button>
    </div>

    <button v-else
            @click="editVideo"
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
    name: "VideoEdit",
    components: {IconBase, IconPen},
    props: ['video'],
    data() {
      return {
        edit: false,
        name: this.video.name,
        id_video: this.video.id_video
      }
    },
    methods: {
      editVideo() {
        this.edit = true;
      },
      saveChange() {
        console.log('-----> ', this.id_video, this.name);
        this.edit = false;
      },
      deleteHandler() {
        if(!confirm('Точно удалить?')) return;
        console.log('-----> ', this.id_video);
        this.edit = false;
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