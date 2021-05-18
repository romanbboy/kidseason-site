<template>
  <div id="HomePage">
    <section class="section">
      <div class="container">
        <JumpText text="САЙТ МУЗЫКАЛЬНОГО РУКОВОДИТЕЛЯ" fontSize="35px" text-align="center"/>
        <br>
        <br>

        <div class="owner-info">
          <AvatarBlock />

          <div class="owner-info--info">
            <h2 class="color-blue">Мороз Лариса Яковлевна</h2>

            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#A168A0'" view-box="0 0 349.2 349.2">
                <IconEducation />
              </IconBase>
              <span>Образование: среднее специальное</span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#4E5B96'" view-box="0 0 349.2 349.2">
                <IconEducation />
              </IconBase>
              <span>Бердичевское педагогическое училище</span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#4329D2'" view-box="0 0 31.368 31.369">
                <IconGoverness/>
              </IconBase>
              <span>Специальность: учитель музыки, музыкальный воспитатель</span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#CE2722'" view-box="0 0 512 512">
                <IconSkill />
              </IconBase>
              <span>Педагогический стаж: 21</span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#000'" view-box="0 0 511.999 511.999">
                <IconCoolSmile />
              </IconBase>
              <span>Квалификационная категория: высшая</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--<section class="pb-3">
      <div class="container flex flex-main-center">
        <img src="../assets/img/elements/license.jpg" alt="Диплом" class="w80" style="border-radius: 5px">
      </div>
    </section>-->

    <section>
      <div class="container">
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastDocuments.length">
          <h2 class="color-blue">Последнее из портфолио</h2>
          <div class="flex flex-wrap">
            <DocumentBlock v-for="doc in lastDocuments" :document="doc" :key="doc._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastScenarios.length">
          <h2 class="color-blue">Сценарии</h2>
          <div class="flex flex-wrap">
            <ScenarioBlock v-for="el in lastScenarios" :scenario="el" :target="'Scenario'" :key="el._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastMethodical.length">
          <h2 class="color-blue">Методическая копилка</h2>
          <div class="flex flex-wrap">
            <ScenarioBlock v-for="el in lastMethodical" :scenario="el" :target="'Methodical'" :key="el._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastVideos.length">
          <h2 class="color-blue">Последние видео</h2>
          <div class="flex flex-main-around flex-wrap">
            <VideoBlock v-for="video in lastVideos" :video="video" :key="video._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5" v-if="lastPhotos.length">
          <h2 class="color-blue">Последние фото</h2>
          <div class="flex flex-main-around flex-cross-center flex-wrap">
            <LightGallery :images="lastPhotos" :index="indexGallery" :disable-scroll="true" @close="indexGallery = null"/>
            <PhotoBlock v-for="(thumb, thumbIndex) in lastPhotos"
                        :photo="thumb"
                        :key="thumbIndex"
                        @change-tumb="indexGallery = thumbIndex"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import AvatarBlock from "../components/AvatarBlock";
import DocumentsService from "@/services/DocumentsService";
import VideosService from "@/services/VideosService";
import ScenariosService from "@/services/ScenariosService";

import DocumentBlock from "@/components/DocumentBlock";
import VideoBlock from "@/components/VideoBlock";
import ScenarioBlock from "@/components/ScenarioBlock";
import PhotosService from "@/services/PhotosService";
import PhotoBlock from "@/components/PhotoBlock";
import JumpText from "@/components/JumpText";
import IconBase from "../components/icons/IconBase"
import IconEducation from "../components/icons/IconEducation"
import IconGoverness from "../components/icons/IconGoverness"
import IconSkill from "../components/icons/IconSkill"
import IconCoolSmile from "../components/icons/IconCoolSmile"
import { LightGallery } from 'vue-light-gallery';

export default {
  name: 'Home',
  components: {
    IconBase,
    IconEducation,
    IconGoverness,
    IconCoolSmile,
    IconSkill,
    JumpText,
    PhotoBlock,
    ScenarioBlock,
    VideoBlock,
    DocumentBlock,
    AvatarBlock,
    LightGallery
  },
  data() {
    return {
      lastDocuments: [],
      lastVideos: [],
      lastScenarios: [],
      lastMethodical: [],
      lastPhotos: [],
      indexGallery: null
    }
  },
  created() {
    this.$store.dispatch('showAside', false)
  },
  async mounted() {
    const lastDocuments = await DocumentsService.fetchDocuments(5);
    const lastVideos = await VideosService.fetchVideos(3);
    const lastScenarios = await ScenariosService.fetchScenarios('common', 5);
    const lastMethodical = await ScenariosService.fetchScenarios('methodical', 5);
    const lastPhotos = await PhotosService.fetchPhotos(4);

    this.lastDocuments = lastDocuments.data.documents;
    this.lastVideos = lastVideos.data.videos;
    this.lastScenarios = lastScenarios.data.scenarios;
    this.lastMethodical = lastMethodical.data.scenarios;
    this.lastPhotos = lastPhotos.data.photos.map(el => `${process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''}${el.path}`);
  }
}
</script>

<style lang="scss" scoped>
  .owner-info{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;

    &--info{
      margin-left: 100px;

      .info-point{
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        svg{
          margin-right: 15px;
        }
      }
    }
  }
</style>
