<template>
  <div class="video-block">
    <p class="bigP fz-24 ff-kosko tac mb-20">Видео</p>

    <div class="form-add form-add_video">
      <h4 class="fz-20 mb-20 text-center cursor-pointer" @click="formAddVideo.show = !formAddVideo.show">Добавить видео</h4>

      <form id="form-video" v-if="formAddVideo.show">
        <div class="form-control">
          <label>Имя видео</label>
          <input type="text" v-model.trim="formAddVideo.name">
        </div>
        <div class="form-control">
          <label>Ссылка на видео</label>
          <input type="text" v-model.trim="formAddVideo.link">
        </div>
        <div class="form-control">
          <label>Категория</label>
          <select v-model="formAddVideo.section">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="el in categories" :value="el.name">{{ el.fullName }}</option>
          </select>
        </div>

        <div class="actions">
          <button type="submit" @click.prevent="addVideo">Добавить</button>
        </div>
      </form>
    </div>

    <div class="panel-category">
      <div class="pc-wrap" v-for="(el, i) in videos" :key="i">
        <p class="fz-20">{{ el.name }}</p>
        <div class="list">
          <VideoEdit v-for="video in el.listVideos"
                     @update-videos="getVideos"
                     :video="video"
                     :categories="categories"
                     :key="video._id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideosService from "@/services/VideosService";
import VideoEdit from "@/components/VideoEdit";

export default {
  name: 'PanelVideos',
  components: {VideoEdit},
  data: () => ({
    formAddVideo: {
      show: false,
      link: null,
      name: '',
      section: ''
    },
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    videos() {
      let allVideos = this.$store.getters.allVideos;
      let categories = [...new Set(allVideos.map(item => item.section))];
      return categories.map(el => ({
        name: this.$store.getters.getFullNameCategory(el),
        listVideos: this.$store.getters.videosCategory(el)
      }))
    },
  },
  methods: {
    // videos
    async addVideo() {
      if (this.formAddVideo.name !== ''
          && this.formAddVideo.section !== ''
          && this.formAddVideo.link
      ) {
        let res = await VideosService.addVideo({
          name: this.formAddVideo.name,
          section: this.formAddVideo.section,
          link: this.formAddVideo.link,
        });

        alert(res.data.message);

        if (res.data.success) {
          this.formAddVideo = {name: '', section: '', link: null, show: true};
          await this.getVideos();
        }
      }
      else alert('Заполни все поля')
    },
    async getVideos() {
      const response = await VideosService.fetchVideos();
      await this.$store.dispatch('setVideos', response.data.videos);
    },
  },
  async mounted() {
    await this.getVideos();
  }
}
</script>

<style scoped>

</style>