<template>
  <div class="h100">
    <EmptyBlock v-if="!section" />

    <div v-else>
      <LightGallery :images="photos" :index="indexGallery" :disable-scroll="true" @close="indexGallery = null"/>

      <div class="flex flex-main-around flex-wrap">

        <PhotoBlock v-for="(thumb, thumbIndex) in photos"
                    :photo="thumb"
                    :key="thumbIndex"
                    @change-tumb="indexGallery = thumbIndex"  />
      </div>
    </div>
  </div>
</template>

<script>
import EmptyBlock from "@/components/EmptyBlock";
import PhotosService from "@/services/PhotosService";
import PhotoBlock from "@/components/PhotoBlock";
import { LightGallery } from 'vue-light-gallery';

export default {
  name: "Photo",
  components: {PhotoBlock, EmptyBlock, LightGallery},
  data: () => ({
    indexGallery: null
  }),
  computed: {
    section() {
      return this.$route.params['section'];
    },
    photos() {
      return this.$store.getters.photosCategory(this.section).map(el => `${process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''}${el.path}`);
    }
  },
  methods: {
    async getPhotos () {
      const response = await PhotosService.fetchPhotos();
      await this.$store.dispatch('setPhotos', response.data.photos);

      let categories = [...new Set(response.data.photos.map(item => item.section))];
      let aside = categories.map(el => ({
        name: this.$store.getters.getFullNameCategory(el),
        section: el
      }));

      this.$store.dispatch('setAside', {aside, component: 'Photo'})
    }
  },
  mounted () {
    this.getPhotos();
  }
}
</script>

<style lang="scss" scoped>

</style>