<template>
  <div class="PhotoBlock" @click="$emit('change-tumb')">
    <img :src="photo" />
  </div>
</template>

<script>

export default {
  name: "PhotoBlock",
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