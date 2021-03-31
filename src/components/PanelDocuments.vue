<template>
  <div  class="documents-block">
    <p class="bigP fz-24 ff-kosko tac mb-20">Документы</p>

    <div class="form-add form-add_document">
      <h4 class="fz-20 mb-20 text-center cursor-pointer" @click="formAddDocument.show = !formAddDocument.show">Добавить документ</h4>

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
</template>

<script>
import DocumentsService from "@/services/DocumentsService";
import DocumentEdit from "@/components/DocumentEdit";
import vueDropzone from "vue2-dropzone";

export default {
  name: 'PanelDocuments',
  components: {DocumentEdit, vueDropzone},
  data: () => ({
    formAddDocument: {
      show: false,
      file: null,
      name: '',
      section: ''
    },
    dropOptions: {
      url: "https://httpbin.org/post",
      maxFiles: 1
    },
  }),
  computed: {
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
  },
  methods: {
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
          await this.getDocuments();
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
  },
  async mounted() {
    await this.getDocuments();
  }
}
</script>

<style scoped>

</style>