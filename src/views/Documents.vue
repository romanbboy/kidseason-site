<template>
  <div id="DocumentsPage">
    <div v-if="!section" class="empty-block">Выберите раздел слева</div>
    <div v-else class="documents-list">
      <DocumentBlock v-for="doc in documents"
                     :document="doc"
                     :key="doc._id"/>
    </div>
  </div>
</template>

<script>
  import DocumentsService from '../services/DocumentsService'

  import DocumentBlock from "../components/DocumentBlock";

  export default {
    name: "Documents",
    components: {DocumentBlock},
    computed: {
      section() {
        return this.$route.params['section'];
      },
      documents() {
        return this.$store.getters.documents(this.section)
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
  #DocumentsPage{
    height: 100%;

    .documents-list{
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
    }
  }
</style>