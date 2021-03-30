<template>
  <div class="h100">
    <EmptyBlock v-if="!section" />
    <div v-else class="flex flex-main-around flex-wrap">
      <VideoBlock v-for="video in videos"
                :video="video"
                :key="video._id"/>
    </div>
  </div>
</template>

<script>
  import VideoBlock from "../components/VideoBlock";
  import VideosService from "../services/VideosService";
  import EmptyBlock from "@/components/EmptyBlock";

  export default {
    name: "Video",
    components: {EmptyBlock, VideoBlock},
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

</style>