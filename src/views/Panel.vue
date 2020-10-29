<template>
  <div id="PanelPage">
    <div v-if="!section" class="empty-block">Панель админа. Выбери раздел слева и редактируй</div>

    <template v-else>

      <!--DOCUMENTS-->
      <div v-if="section === 'documents'" class="documents-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Документы</p>

        <div class="panel-category">
          <div class="pc-wrap" v-for="(el, i) in documents" :key="i+el.section">
            <p class="fz-20">{{ el.name }}</p>
            <div class="list">
              <DocumentEdit v-for="doc in el.listDocuments"
                            :doc="doc"
                            :key="doc.name"/>
            </div>
          </div>
        </div>
      </div>

      <!--VIDEO-->
      <div v-if="section === 'video'" class="video-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Видео</p>

        <div class="panel-category">
          <div class="pc-wrap" v-for="(el, i) in video" :key="i+el.section">
            <p class="fz-20">{{ el.name }}</p>
            <div class="list">
              <VideoEdit v-for="video in el.listVideo"
                            :video="video"
                            :key="video.id_video"/>
            </div>
          </div>
        </div>
      </div>

      <!--SCENARIO-->
      <div v-if="section === 'scenario'" class="scenario-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Сценарии</p>

        <div class="panel-category">
          <div class="pc-wrap" v-for="(el, i) in scenario" :key="i+el.section">
            <p class="fz-20">{{ el.name }}</p>
            <div class="list">
              <ScenarioEdit v-for="scenario in el.listScenario"
                            :scene="scenario"
                            :key="scenario.id_scene"/>
            </div>
          </div>
        </div>
      </div>


    </template>
  </div>
</template>

<script>
  import jsonDocuments from '../db/documents.json'
  import jsonVideo from '../db/videos.json'
  import jsonScenario from '../db/scenario.json'
  
  import DocumentEdit from "../components/DocumentEdit";
  import md5 from "../utils/md5";
  import VideoEdit from "../components/VideoEdit";
  import ScenarioEdit from "../components/ScenarioEdit";

  export default {
    name: "Panel",
    components: {ScenarioEdit, VideoEdit, DocumentEdit},
    data() {
      return {
        documents: [],
        video: [],
        scenario: []
      }
    },
    computed: {
      section() {
        return this.$route.params['section']
      }
    },
    watch: {
      $route(toR, fromR) {
        if(toR.params['section'] === 'documents') this.documents = jsonDocuments.documents;
        if(toR.params['section'] === 'video') this.video = jsonVideo.videos;
        if(toR.params['section'] === 'scenario') this.scenario = jsonScenario.scenario;
      }
    },
    created() {
      // let password = md5(prompt('Введи пароль'));
      // qaz123wsx
      // if(password !== '2ee90831762b966e9fa6ef28cb501032') this.$router.push('/');
    }
  }
</script>

<style lang="scss" scoped>
  #PanelPage{
    height: 100%;

    .panel-category{
      .pc-wrap{
        margin-bottom: 30px;

        p{
          border-bottom: $border;
          width: fit-content;
        }

        .list{
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
</style>