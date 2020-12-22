<template>
  <div class="photo-edit">
    <img :src="`${process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''}${photo.path}`" />

    <button @click="deleteHandler">x</button>
  </div>
</template>

<script>
import IconBase from "./icons/IconBase";
import IconDelete from "./icons/IconDelete";
import PhotosService from "@/services/PhotosService";

export default {
  name: "PhotoEdit",
  components: {IconBase, IconDelete},
  props: ['photo'],
  methods: {
    async deleteHandler() {
      if(!confirm('Точно удалить?')) return;
      let res = await PhotosService.deletePhoto(this.photo._id);

      alert(res.data.message);

      if(res.data.success) this.$emit('update-photos');
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-edit{
  margin: 10px;
  position: relative;
  
  &:hover{
    button{
      display: block;
    }
  }

  img{
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  button{
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>