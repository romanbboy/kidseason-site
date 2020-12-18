<template>
  <div class="PhotoBlock">
<!--    для разработки-->
<!--    <img :src="`http://localhost:8081${photo.path}`" />-->

    <!--    для прода-->
    <img :src="photo.path" />

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
  flex: 18% 0 0;
  margin-bottom: 15px;
  min-width: 200px;

  img{
    width: 100%;
    min-height: 150px;
    object-fit: cover;
  }
}
</style>