<template>
  <div class="photo-block">
    <h3 class="text-center">Фото</h3>

    <div class="form-add form-add_photo">
      <h4 class="fz-20 mb-20 text-center cursor-pointer" @click="formAddPhoto.show = !formAddPhoto.show">Добавить фото</h4>

      <form id="form-photo" v-if="formAddPhoto.show">
        <div class="form-control">
          <label>Категория</label>
          <select v-model="formAddPhoto.section">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="el in categories" :value="el.name">{{ el.fullName }}</option>
          </select>
        </div>
        <div class="form-control">
          <label>Загрузить файлы</label>
          <vue-dropzone id="dropzone_photo"
                        ref="dropzone_photo"
                        @vdropzone-success="addedPhotosDropZone"
                        @vdropzone-error="addedPhotosDropZoneError"
                        :useCustomSlot="true"
                        :options="dropOptions">
            Мамочка, нажми сюда и можешь выбрать несколько файлов
          </vue-dropzone>
        </div>

        <i>Разрешенные форматы: <b>jpg, jpeg, png</b></i>
        <div class="actions">
          <button type="submit" @click.prevent="addPhoto">Добавить</button>
        </div>
      </form>
    </div>

    <div class="panel-category">
      <div class="pc-wrap" v-for="(el, i) in photos" :key="i">
        <p class="fz-20">{{ el.name }}</p>
        <div class="list">
          <PhotoEdit v-for="photo in el.listPhotos"
                     @update-photos="getPhotos"
                     :photo="photo"
                     :key="photo._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotosService from "@/services/PhotosService";
import vueDropzone from "vue2-dropzone";
import PhotoEdit from "@/components/PhotoEdit";

export default {
  name: 'PanelPhotos',
  components: {
    PhotoEdit,
    vueDropzone
  },
  data: () => ({
    dropOptions: {
      url: "https://httpbin.org/post"
    },
    formAddPhoto: {
      show: false,
      photos: [],
      section: ''
    },
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    photos() {
      let allPhotos = this.$store.getters.allPhotos;
      let categories = [...new Set(allPhotos.map(item => item.section))];
      return categories.map(el => ({
        name: this.$store.getters.getFullNameCategory(el),
        listPhotos: this.$store.getters.photosCategory(el)
      }))
    },
  },
  methods: {

    // photo
    async addPhoto() {
      if (this.formAddPhoto.section !== '' && this.formAddPhoto.photos.length) {
        let formData = new FormData();
        formData.append('section', this.formAddPhoto.section);

        this.formAddPhoto.photos.forEach(el => {
          formData.append('photos[]', el);
        })

        let res = await PhotosService.addPhoto(formData);

        alert(res.data.message);

        this.$refs.dropzone_photo.removeAllFiles();
        this.$refs.dropzone_photo.enable();
        this.formAddPhoto.files = [];

        if(res.data.success){
          this.formAddPhoto.section = '';
          await this.getPhotos();
        }
      }
      else alert('Заполни все поля и добавь фоточки')
    },
    async getPhotos() {
      const response = await PhotosService.fetchPhotos();
      await this.$store.dispatch('setPhotos', response.data.photos);
    },
    addedPhotosDropZone(file) {
      if(file.status === 'success'){
        this.formAddPhoto.photos.push(file);
      }
      else alert('Случилась ошибка');
    },
    addedPhotosDropZoneError() {
      alert('Случилась ошибка. Перезагрузи страницу и попробуй еще раз');
    },
  },
  async mounted() {
    await this.getPhotos();
  }
}
</script>

<style scoped>

</style>