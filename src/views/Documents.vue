<template>
  <div id="DocumentsPage">
    <div v-if="!section" class="empty-block">Выберите раздел слева</div>
    <div v-else class="documents-list">
      <DocumentBlock v-for="(doc, indx) in documents"
                     :document="doc"
                     :key="indx"/>
    </div>
  </div>
</template>

<script>
  import jsonData from '../db/documents.json'
  import DocumentBlock from "../components/DocumentBlock";

  export default {
    name: "Documents",
    components: {DocumentBlock},
    computed: {
      section() {
        return this.$route.params['section'];
      },
      documents() {
        return this.$store.getters.listDocuments(this.section)
      }
    },
    created() {
      this.$store.dispatch('setDocuments', jsonData.documents);

      let aside = jsonData.documents.map(({section, name}) => ({section, name}));
      this.$store.dispatch('setAside', {aside, component: 'Documents'})
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