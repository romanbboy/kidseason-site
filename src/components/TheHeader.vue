<template>
  <header>
    <div class="container header">
      <router-link tag="div" style="cursor: pointer;" exact to="/">
        <v-logo-name />
      </router-link>

      <nav>
        <router-link tag="li" class="nav-item" exact to="/" active-class="active">
          <a class="nav-link">Главная</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/documents" active-class="active" v-if="lastDocuments.length">
          <a class="nav-link">Портфолио</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/video" active-class="active" v-if="lastVideos.length">
          <a class="nav-link">Видео</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/scenario" active-class="active" v-if="lastScenarios.length">
          <a class="nav-link">Методическая копилка</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/photo" active-class="active" v-if="lastPhotos.length">
          <a class="nav-link">Фото</a>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
  import LogoName from '@/components/LogoName.vue'
  import DocumentsService from "@/services/DocumentsService";
  import VideosService from "@/services/VideosService";
  import ScenariosService from "@/services/ScenariosService";
  import PhotosService from "@/services/PhotosService";

  export default {
    name: "TheHeader",
    components: {
      vLogoName: LogoName
    },
    data() {
      return {
        lastDocuments: [],
        lastVideos: [],
        lastScenarios: [],
        lastPhotos: [],
      }
    },
    async mounted() {
      const lastDocuments = await DocumentsService.fetchDocuments(5);
      const lastVideos = await VideosService.fetchVideos(3);
      const lastScenarios = await ScenariosService.fetchScenarios(5);
      const lastPhotos = await PhotosService.fetchPhotos(5);

      this.lastDocuments = lastDocuments.data.documents;
      this.lastVideos = lastVideos.data.videos;
      this.lastScenarios = lastScenarios.data.scenarios;
      this.lastPhotos = lastPhotos.data.photos;
    }
  }
</script>

<style lang="scss" scoped>
header{
  padding: 15px 0;
  background: linear-gradient(135deg, rgba(175, 167, 227, 0.8), rgba(211, 255, 232, 0.7));
  border-bottom: var(--border-markup);
  height: 130px;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  nav{
    .nav-item{
      font-family: 'Kosko';
      font-size: 24px;
      padding: 0;
      display: inline-block;
      margin-right: 25px;
      list-style: none;
      &:last-child{
        margin-right: 0;
      }

      &.active{
        a{
          color: #EC4D77;
        }
      }

      a{
        text-decoration: none;
        &:hover{
          color: #F4809A;
        }
      }
    }
  }
}
</style>