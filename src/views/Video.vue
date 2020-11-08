<template>
  <div id="VideoPage">
    <div v-if="!section" class="empty-block">Выберите раздел слева</div>
    <div v-else class="video-list">
      <VideoBlock v-for="video in videos"
                :video="video"
                :key="video._id"/>
    </div>
  </div>
</template>

<script>
  import VideoBlock from "../components/VideoBlock";
  import VideosService from "../services/VideosService";

  export default {
    name: "Video",
    components: {VideoBlock},
    computed: {
      section() {
        return this.$route.params['section'];
      },
      videos() {
        return this.$store.getters.videosCategory(this.section)
      }
    },
    methods: {
      async getVideos () {
        const response = await VideosService.fetchVideos();
        await this.$store.dispatch('setVideos', response.data.videos);

        let categories = [...new Set(response.data.videos.map(item => item.section))];
        let aside = categories.map(el => ({
            name: this.$store.getters.getFullNameCategory(el),
            section: el
        }));

        this.$store.dispatch('setAside', {aside, component: 'Video'})
      }
    },
    mounted () {
      this.getVideos();
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