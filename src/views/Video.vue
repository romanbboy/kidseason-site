<template>
  <div id="VideoPage">
    <div v-if="!section" class="empty-block">Выберите раздел слева</div>
    <div v-else class="video-list">
      <VideoBlock v-for="(video, indx) in videos"
                :video="video"
                :key="video.id_video"/>
    </div>
  </div>
</template>

<script>
  import jsonData from '../db/videos.json'
  import VideoBlock from "../components/VideoBlock";

  export default {
    name: "Video",
    components: {VideoBlock},
    computed: {
      section() {
        return this.$route.params['section'];
      },
      videos() {
        return this.$store.getters.listVideos(this.section)
      }
    },
    created() {
      this.$store.dispatch('setVideos', jsonData.videos);

      let aside = jsonData.videos.map(({section, name}) => ({section, name}));
      this.$store.dispatch('setAside', {aside, component: 'Video'})
    }
  }
</script>

<style lang="scss" scoped>
  #VideoPage{
    height: 100%;

    .video-list{
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
    }
  }
</style>