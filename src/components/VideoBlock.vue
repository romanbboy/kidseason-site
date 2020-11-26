<template>
  <div class="VideoBlock">
    <iframe :src="video.link" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <p>{{ video.name }}</p>
  </div>
</template>

<script>
  export default {
    name: "VideoBlock",
    props: ['video']
  }
</script>

<style lang="scss" scoped>
  .VideoBlock{
    flex: 30% 0 0;
    margin-bottom: 15px;
    min-width: 300px;

    iframe{
      width: 100% !important;
      height: 250px;
    }

    p{
      font-family: var(--cartoon-font-family);
      font-size: 1.125rem;
    }
  }
</style>