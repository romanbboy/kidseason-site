<template>
  <div id="HomePage">
    <section class="section">
      <div class="container">
        <div class="owner-info">
          <AvatarBlock />

          <div class="owner-info--info">
            <JumpText text="Мороз Лариса Яковлевна" fontSize="45px" />
            <br>

            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#A168A0'" view-box="0 0 349.2 349.2">
                <IconEducation />
              </IconBase>
              <span>Образование: <b>среднее специальное</b></span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#4E5B96'" view-box="0 0 349.2 349.2">
                <IconEducation />
              </IconBase>
              <span><b>Бердичевское педагогическое училище</b></span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#4329D2'" view-box="0 0 31.368 31.369">
                <IconGoverness/>
              </IconBase>
              <span>Специальность: <b>учитель музыки, музыкальный воспитатель</b></span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#CE2722'" view-box="0 0 512 512">
                <IconSkill />
              </IconBase>
              <span>Педагогический стаж: <b>21</b></span>
            </div>
            <div class="info-point">
              <IconBase width="30" height="30" :icon-color="'#000'" view-box="0 0 511.999 511.999">
                <IconCoolSmile />
              </IconBase>
              <span>Квалификационная категория: <b>высшая</b></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-3">
      <div class="container">
        Без музыки не проживу и дня!<br>
        Она во мне. Она вокруг меня <br>
        И в пенье птиц, и в шуме городов, <br>
        В молчанье трав и в радуге цветов, <br>
        И в зареве рассвета над землей...
      </div>
    </section>

    <section>
      <div class="container">
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastDocuments.length">
          <h2>Последние документы</h2>
          <div class="flex flex-wrap">
            <DocumentBlock v-for="doc in lastDocuments" :document="doc" :key="doc._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastScenarios.length">
          <h2>Сценарии</h2>
          <div class="flex flex-wrap">
            <ScenarioBlock v-for="el in lastScenarios" :scenario="el" :key="el._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5 border-bottom--blue" v-if="lastVideos.length">
          <h2>Последние видео</h2>
          <div class="flex flex-main-around flex-wrap">
            <VideoBlock v-for="video in lastVideos" :video="video" :key="video._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5" v-if="lastPhotos.length">
          <h2>Последние фото</h2>
          <div class="flex flex-main-around flex-cross-center flex-wrap">
            <PhotoBlock v-for="photo in lastPhotos" :photo="photo" :key="photo._id"/>
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
    AvatarBlock
  },
  data() {
    return {
      lastDocuments: [],
      lastVideos: [],
      lastScenarios: [],
      lastPhotos: [],
    }
  },
  created() {
    this.$store.dispatch('showAside', false)
  },
  async mounted() {
    const lastDocuments = await DocumentsService.fetchDocuments(5);
    const lastVideos = await VideosService.fetchVideos(3);
    const lastScenarios = await ScenariosService.fetchScenarios(5);
    const lastPhotos = await PhotosService.fetchPhotos(4);

    this.lastDocuments = lastDocuments.data.documents;
    this.lastVideos = lastVideos.data.videos;
    this.lastScenarios = lastScenarios.data.scenarios;
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
