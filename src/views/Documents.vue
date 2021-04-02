<template>
  <div class="h100">
    <EmptyBlock v-if="!section" />

    <div v-else>
      <LightGallery :images="photos" :index="indexGallery" :disable-scroll="true" @close="indexGallery = null"/>

      <div class="flex flex-wrap">

        <PhotoBlock v-for="(thumb, thumbIndex) in photos"
                    :photo="thumb"
                    :key="thumbIndex"
                    @change-tumb="indexGallery = thumbIndex"  />
      </div>

      <div class="flex flex-wrap">
        <DocumentBlock v-for="doc in documents"
                       :document="doc"
                       :key="doc._id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import DocumentsService from '../services/DocumentsService'

  import DocumentBlock from "../components/DocumentBlock";
  import EmptyBlock from "@/components/EmptyBlock";
  import getExtension from "@/utils/getExtension";
  import PhotoBlock from "@/components/PhotoBlock";
  import { LightGallery } from 'vue-light-gallery';

  export default {
    name: "Documents",
    components: {PhotoBlock, EmptyBlock, DocumentBlock, LightGallery},
    data: () => ({
      indexGallery: null
    }),
    computed: {
      section() {
        return this.$route.params['section'];
      },
      documents() {
        const extPic = ['png', 'jpg', 'jpeg'];
        return this.$store.getters.documentsCategory(this.section).filter(el => !extPic.includes(getExtension(el.path)))
      },
      photos() {
        const extPic = ['png', 'jpg', 'jpeg'];

        return this.$store.getters.documentsCategory(this.section).reduce((acc, el) => {
          if (extPic.includes(getExtension(el.path))) acc.push(`${process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''}${el.path}`)
          return acc
        }, [])
      }
    },
    methods: {
      async getDocuments () {
        const response = await DocumentsService.fetchDocuments();
        await this.$store.dispatch('setDocuments', response.data.documents);

        let categories = [...new Set(response.data.documents.map(item => item.section))];
        let aside = categories.map(el => ({
            name: this.$store.getters.getFullNameCategory(el),
            section: el
        }));
        
        await this.$store.dispatch('setAside', {aside, component: 'Documents'})
      }
    },
    mounted () {
      this.getDocuments();
    }
  }
</script>

<style lang="scss" scoped>

</style>