<template>
  <div id="PanelPage">
    <div v-if="!section" class="empty-block">Панель админа. Выбери раздел слева и редактируй</div>

    <template v-else>

      <!--COMMON-->
      <div v-if="section === 'common'" class="common-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Общие настройки</p>

        <form @submit.prevent="addCategory" class="form-add form-add_category">
          <p class="fz-20 mb-20 tac">Добавить категорию</p>

          <div class="form-control">
            <label>Какие вообще есть категории:</label>
            <select>
              <option v-for="el in categories" :value="el.name">{{ el.fullName }}</option>
            </select>
          </div>

          <div class="form-control">
            <label>Название категории (на русском)</label>
            <input type="text" v-model.trim="formAddCategory.fullName">
          </div>
          <div class="form-control">
            <label>Расшифровка (на английском)</label>
            <input type="text" v-model.trim="formAddCategory.name">
          </div>

          <div class="actions">
            <button type="submit">Добавить</button>
          </div>
        </form>
      </div>

      <!--DOCUMENTS-->
      <div v-if="section === 'documents'" class="documents-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Документы</p>

        <div class="form-add form-add_document">
          <p class="fz-20 mb-20 tac curpointer" @click="formAddDocument.show = !formAddDocument.show">Добавить документ</p>

          <form id="form-documents" v-if="formAddDocument.show">
            <div class="form-control">
              <label>Имя документа</label>
              <input type="text" v-model.trim="formAddDocument.name">
            </div>
            <div class="form-control">
              <label>Категория</label>
              <select v-model="formAddDocument.section">
                <option disabled value="">Выберите один из вариантов</option>
                <option v-for="el in categories" :value="el.name">{{ el.fullName }}</option>
              </select>
            </div>
            <div class="form-control">
              <label>Загрузить файл</label>
              <vue-dropzone id="dropzone"
                            ref="dropzone"
                            @vdropzone-success="addedFileDropZone"
                            @vdropzone-error="addedFileDropZoneError"
                            :useCustomSlot="true"
                            :options="dropOptions">
                Мамочка, нажми или перетащи сюда не более ОДНОГО файла
              </vue-dropzone>
            </div>

            <i>Разрешенные форматы: <b>doc, docx, pdf</b></i>
            <div class="actions">
              <button type="submit" @click.prevent="addDocument">Добавить</button>
            </div>
          </form>
        </div>

        <!--<div class="panel-category">-->
          <!--<div class="pc-wrap" v-for="(el, i) in documents" :key="i+el.section">-->
            <!--<p class="fz-20">{{ el.name }}</p>-->
            <!--<div class="list">-->
              <!--<DocumentEdit v-for="doc in el.listDocuments"-->
                            <!--:doc="doc"-->
                            <!--:key="doc.name"/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>

      <!--VIDEO-->
      <div v-if="section === 'video'" class="video-block">
        <p class="bigP fz-24 ff-kosko tac mb-20">Видео</p>

        <div class="form-add form-add_video">
          <p class="fz-20 mb-20 tac curpointer" @click="formAddVideo.show = !formAddVideo.show">Добавить видео</p>

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

        <!--<div class="panel-category">-->
          <!--<div class="pc-wrap" v-for="(el, i) in video" :key="i+el.section">-->
            <!--<p class="fz-20">{{ el.name }}</p>-->
            <!--<div class="list">-->
              <!--<VideoEdit v-for="video in el.listVideo"-->
                            <!--:video="video"-->
                            <!--:key="video.id_video"/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
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
  import DocumentEdit from "../components/DocumentEdit";
  import VideoEdit from "../components/VideoEdit";
  import ScenarioEdit from "../components/ScenarioEdit";

  import md5 from "../utils/md5";
  import vueDropzone from "vue2-dropzone";
  import CKEditor from 'ckeditor4-vue';
  import DocumentsService from "../services/DocumentsService";
  import CategoriesService from "../services/CategoriesService";
  import VideosService from "../services/VideosService";

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
      formAddCategory: {
        fullName: '',
        name: ''
      },
      formAddDocument: {
        show: false,
        file: null,
        name: '',
        section: ''
      },
      formAddVideo: {
        show: false,
        link: null,
        name: '',
        section: ''
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
      },
      categories() {
        return this.$store.getters.categories;
      }
    },
    methods: {

      // category
      async addCategory() {
       if (this.formAddCategory.name !== '' && this.formAddCategory.fullName !== '') {
         const res = await CategoriesService.addCategory({
           name: this.formAddCategory.name,
           fullName: this.formAddCategory.fullName
         });

         alert(res.data.message);

         if(res.data.success) {
           const response = await CategoriesService.fetchCategories();
           this.$store.dispatch('setCategories', response.data.categories);
           this.formAddCategory = {name: '', fullName: ''}
         }
       }
       else alert('Заполни все поля')
      },

      // documents
      async addDocument() {
        if (this.formAddDocument.name !== ''
          && this.formAddDocument.section !== ''
          && this.formAddDocument.file
        ) {
          let formData = new FormData();
          formData.append('name', this.formAddDocument.name);
          formData.append('section', this.formAddDocument.section);
          formData.append('file', this.formAddDocument.file);

          let res = await DocumentsService.addDocument(formData);

          alert(res.data.message);

          this.$refs.dropzone.removeAllFiles();
          this.$refs.dropzone.enable();
          this.formAddDocument.file = null;

          if(res.data.success){
            this.formAddDocument.name = '';
            this.formAddDocument.section = '';
          }
        }
       else alert('Заполни все поля')
      },
      addedFileDropZone(file) {
        if(file.status === 'success'){
          this.formAddDocument.file = file;
          this.$refs.dropzone.disable();
        }
        else alert('Можно добавлять только один файл. Либо случилась ошибка');
      },
      addedFileDropZoneError() {
        alert('Мам, ты не можешь загрузить больше одного файла. Либо случилась ошибка. Перезагрузи страницу и попробуй еще раз');
      },

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
            this.formAddVideo = {name: '', section: '', link: null, show: true}
          }
        }
        else alert('Заполни все поля')
      },

      // scenario
      addScenario() {
        console.log('-----> ', this.formAddScenario.content, this.formAddScenario.name);
      }
    },
    watch: {
      $route(toR, fromR) {
        // if(toR.params['section'] === 'documents') this.documents = jsonDocuments.documents;
        // if(toR.params['section'] === 'video') this.video = jsonVideo.videos;
        // if(toR.params['section'] === 'scenario') this.scenario = jsonScenario.scenario;
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