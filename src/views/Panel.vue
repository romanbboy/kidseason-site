<template>
  <div id="PanelPage">
    <EmptyBlock v-if="!section" />

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

        <div class="panel-category">
          <div class="pc-wrap" v-for="(el, i) in documents" :key="i">
            <p class="fz-20">{{ el.name }}</p>
            <div class="list">
              <DocumentEdit v-for="doc in el.listDocuments"
                            @update-documents="getDocuments"
                            :doc="doc"
                            :categories="categories"
                            :key="doc._id"/>
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
            <div class="form-control mb-20">
              <label>Категория</label>
              <select v-model="formAddScenario.section">
                <option disabled value="">Выберите один из вариантов</option>
                <option v-for="el in categories" :value="el.name">{{ el.fullName }}</option>
              </select>
            </div>
            <br>
            <div class="form-control">
              <ckeditor v-model="formAddScenario.content"></ckeditor>
            </div>

            <div class="actions">
              <button type="submit" @click.prevent="addScenario">Добавить</button>
            </div>
          </form>
        </div>

        <div class="panel-category">
          <div class="pc-wrap" v-for="(el, i) in scenarios" :key="i">
            <p class="fz-20">{{ el.name }}</p>
            <div class="list">
              <ScenarioEdit v-for="scenario in el.listScenarios"
                            @update-scenarios="getScenarios"
                            :scene="scenario"
                            :categories="categories"
                            :key="scenario._id"/>
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
  import ScenariosService from "../services/ScenariosService";
  import EmptyBlock from "@/components/EmptyBlock";

  export default {
    name: "Panel",
    components: {EmptyBlock, ScenarioEdit, VideoEdit, DocumentEdit, vueDropzone, ckeditor: CKEditor.component},
    data: () => ({
      dropOptions: {
        url: "https://httpbin.org/post",
        maxFiles: 1
      },
      formAddCategory: {
        fullName: ''
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
        name: '',
        section: ''
      }
    }),
    computed: {
      section() {
        return this.$route.params['section']
      },
      categories() {
        return this.$store.getters.categories;
      },
      documents() {
        let allDocuments = this.$store.getters.allDocuments;
        let categories = [...new Set(allDocuments.map(item => item.section))];
        return categories.map(el => ({
            name: this.$store.getters.getFullNameCategory(el),
            listDocuments: this.$store.getters.documentsCategory(el)
        }))
      },
      videos() {
        let allVideos = this.$store.getters.allVideos;
        let categories = [...new Set(allVideos.map(item => item.section))];
        return categories.map(el => ({
            name: this.$store.getters.getFullNameCategory(el),
            listVideos: this.$store.getters.videosCategory(el)
        }))
      },
      scenarios() {
        let allScenarios = this.$store.getters.allScenarios;
        let categories = [...new Set(allScenarios.map(item => item.section))];
        return categories.map(el => ({
            name: this.$store.getters.getFullNameCategory(el),
            listScenarios: this.$store.getters.scenariosCategory(el)
        }))
      },
    },
    methods: {

      // category
      async addCategory() {
       if (this.formAddCategory.fullName) {
         const res = await CategoriesService.addCategory({
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
            this.getDocuments();
          }
        }
       else alert('Заполни все поля')
      },
      async getDocuments() {
        const response = await DocumentsService.fetchDocuments();
        await this.$store.dispatch('setDocuments', response.data.documents);
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
            this.formAddVideo = {name: '', section: '', link: null, show: true};
            this.getVideos();
          }
        }
        else alert('Заполни все поля')
      },
      async getVideos() {
        const response = await VideosService.fetchVideos();
        await this.$store.dispatch('setVideos', response.data.videos);
      },

      // scenario
      async addScenario() {
        if (this.formAddScenario.name !== ''
          && this.formAddScenario.section !== ''
          && this.formAddScenario.content !== ''
        ) {
          let res = await ScenariosService.addScenario({
            name: this.formAddScenario.name,
            section: this.formAddScenario.section,
            content: this.formAddScenario.content
          });

          alert(res.data.message);

          if (res.data.success) {
            this.formAddScenario = {name: '', section: '', content: '', show: true}
            this.getScenarios();
          }
        }
        else alert('Заполни все поля')
      },
      async getScenarios() {
        const response = await ScenariosService.fetchScenarios();
        await this.$store.dispatch('setScenarios', response.data.scenarios);
      },
    },
    watch: {
      async $route(toR, fromR) {
        if(toR.params['section'] === 'documents') this.getDocuments();
        if(toR.params['section'] === 'video') this.getVideos();
        if(toR.params['section'] === 'scenario') this.getScenarios();
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
          border-bottom: var(--border-markup);
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