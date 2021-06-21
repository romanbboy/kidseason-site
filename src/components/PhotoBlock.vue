<template>
  <div class="PhotoBlock" @click="$emit('change-tumb')">
    <img :src="photo.path" />
    <JumpText v-if="photo.name" :text="photo.name" color="#46A4B5" fontSize="20px" />
  </div>
</template>

<script>

import JumpText from "@/components/JumpText";
export default {
  name: "PhotoBlock",
  components: {JumpText},
  props: ['photo']
}
</script>

<style lang="scss" scoped>
.PhotoBlock{
  flex: 23% 0 0;
  margin: 15px 10px;
  min-width: 200px;
  cursor: pointer;

  img{
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>