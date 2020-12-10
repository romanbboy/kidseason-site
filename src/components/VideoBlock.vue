<template>
  <div class="VideoBlock">
    <iframe :src="srcVideo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <p>{{ video.name }}</p>
  </div>
</template>

<script>
import {getUrlParam} from '@/utils/getUrlParameter';

export default {
  name: "VideoBlock",
  props: ['video'],
  computed: {
    srcVideo() {
      return `https://www.youtube.com/embed/${getUrlParam('v', this.video.link)}`
    }
  }
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