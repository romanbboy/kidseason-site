<template>
  <div class="h100 flex flex-cross-center flex-main-center">
    <EmptyBlock v-if="!section" />
    <VueSlider v-else :photos="photos" />
  </div>
</template>

<script>
import EmptyBlock from "@/components/EmptyBlock";
import { VueAgile } from 'vue-agile'
import VueSlider from "@/components/VueSlider";
import PhotosService from "@/services/PhotosService";

export default {
  name: "Photo",
  components: {VueSlider, EmptyBlock, VueAgile},
  data: () => ({

  }),
  computed: {
    section() {
      return this.$route.params['section'];
    },
    photos() {
      return this.$store.getters.photosCategory(this.section)
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