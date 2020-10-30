<template>
  <div id="PanelPage">
    <div v-if="!section" class="empty-block">Панель админа. Выбери раздел слева и редактируй</div>

    <template v-else>

      <!--DOCUMENTS-->
      <div v-if="section === 'documents'" class="documents-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Документы</p>

        <div class="form-add form-add_document">
          <p class="fz-20 mb-20 tac curpointer" @click="formAddDocument.show = !formAddDocument.show">Добавить документ</p>

          <form id="form-documents" v-if="formAddDocument.show">
            <div class="form-control">
              <label>Имя документа</label>
              <input type="text" v-model="formAddDocument.name">
            </div>
            <div class="form-control">
              <label>Загрузить файл</label>
              <vue-dropzone id="dropzone"
                            @vdropzone-complete="addedFileDropZone"
                            :options="dropOptions"></vue-dropzone>
            </div>

            <div class="actions">
              <button type="submit" @click.prevent="addDocument">Добавить</button>
            </div>
          </form>
        </div>

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

        <div class="form-add form-add_video">
          <p class="fz-20 mb-20 tac curpointer" @click="formAddVideo.show = !formAddVideo.show">Добавить видео</p>

          <form id="form-video" v-if="formAddVideo.show">
            <div class="form-control">
              <label>Имя видео</label>
              <input type="text" v-model="formAddVideo.name">
            </div>
            <div class="form-control">
              <label>Ссылка на видео</label>
              <input type="text" v-model="formAddVideo.link">
            </div>

            <div class="actions">
              <button type="submit" @click.prevent="addVideo">Добавить</button>
            </div>
          </form>
        </div>

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

        <div class="form-add form-add_scenario">
          <p class="fz-20 mb-20 tac curpointer" @click="formAddScenario.show = !formAddScenario.show">Добавить сценарий</p>

          <form id="form-scenario" v-if="formAddScenario.show">
            <div class="form-control">
              <label>Имя сценария</label>
              <input type="text" v-model="formAddScenario.name">
            </div>
            <div class="form-control">
              <ckeditor v-model="formAddScenario.content"></ckeditor>
            </div>

            <div class="actions">
              <button type="submit" @click.prevent="addScenario">Добавить</button>
            </div>
          </form>
        </div>

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

  import vueDropzone from "vue2-dropzone";
  import CKEditor from 'ckeditor4-vue';

  export default {
    name: "Panel",
    components: {ScenarioEdit, VideoEdit, DocumentEdit, vueDropzone, ckeditor: CKEditor.component},
    data: () => ({
      documents: [],
      video: [],
      scenario: [],
      dropOptions: {
        url: "https://httpbin.org/post",
        maxFiles: 1
      },
      formAddDocument: {
        show: false,
        file: null,
        name: ''
      },
      formAddVideo: {
        show: false,
        link: null,
        name: ''
      },
      formAddScenario: {
        show: false,
        content: '',
        name: ''
      }
    }),
    computed: {
      section() {
        return this.$route.params['section']
      }
    },
    methods: {
      addDocument(e) {
        console.log('-----> ', this.formAddDocument.file, this.formAddDocument.name);
      },
      addedFileDropZone(file) {
        if(file.status === 'success') this.formAddDocument.file = file;
        else alert('Можно добавлять только один файл. Либо случилась ошибка');
      },
      addVideo() {
        console.log('-----> ', this.formAddVideo.link, this.formAddVideo.name);
      },
      addScenario() {
        console.log('-----> ', this.formAddScenario.content, this.formAddScenario.name);
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

    form{
      .form-control{
        margin-bottom: 10px;

        label{
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }
        input{
          width: 100%;
        }
      }

      .actions{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 15px 0;
      }
    }


    .form-add{
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 30px;
    }
  }
</style>