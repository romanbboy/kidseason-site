<template>
  <div class="h100">
    <EmptyBlock v-if="!section" />
    <div v-else class="flex">
      <DocumentBlock v-for="doc in documents"
                     :document="doc"
                     :key="doc._id"/>
    </div>
  </div>
</template>

<script>
  import DocumentsService from '../services/DocumentsService'

  import DocumentBlock from "../components/DocumentBlock";
  import EmptyBlock from "@/components/EmptyBlock";

  export default {
    name: "Documents",
    components: {EmptyBlock, DocumentBlock},
    computed: {
      section() {
        return this.$route.params['section'];
      },
      documents() {
        return this.$store.getters.documentsCategory(this.section)
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
        
        this.$store.dispatch('setAside', {aside, component: 'Documents'})
      }
    },
    mounted () {
      this.getDocuments();
    }
  }
</script>

<style lang="scss" scoped>

</style>