<template>
  <div id="application" :class="`Bg-${page}`">
    <TheLoader />

    <v-header />

    <main>
      <div class="container main">
        <v-aside v-if="page !== 'Home' && page !== 'Error404'" />

        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </main>

    <v-footer />

  </div>
</template>

<script>
  import TheHeader from './components/TheHeader.vue'
  import TheAside from './components/TheAside.vue'
  import TheFooter from './components/TheFooter.vue'

  import CategoriesService from "./services/CategoriesService";
  import TheLoader from "@/components/TheLoader";

  export default {
    components: {
      TheLoader,
      vHeader: TheHeader,
      vAside: TheAside,
      vFooter: TheFooter
    },
    computed: {
      page() {
        return this.$route.name;
      }
    },
    methods: {
      async getCategories() {
        const response = await CategoriesService.fetchCategories();
        this.$store.dispatch('setCategories', response.data.categories);
      }
    },
    mounted() {
      this.getCategories();
    }
  }
</script>

<style lang="scss">
#application{
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  $main-gradient: linear-gradient(to right, rgba(175, 167, 227, 0.98), rgba(211, 255, 232, 0.8));

  &.Bg-Home{
    background: $main-gradient, url('./assets/img/bg/mainBG.png') repeat;
  }
  &.Bg-Video{
    background-image: $main-gradient, url('./assets/img/bg/bg_video.jpg');
  }
  &.Bg-Documents{
    background-image: $main-gradient, url('./assets/img/bg/bg_documents.jpg');
  }
  &.Bg-Photo{
    background-image: $main-gradient, url('./assets/img/bg/bg_photo.jpg');
  }
  &.Bg-Scenario, &.Bg-ScenarioFull{
    background-image: $main-gradient, url('./assets/img/bg/bg_scenario.jpg');
  }

}

main{
  .main{
    display: flex;

    .content{
      flex: 1;
      min-height: calc(100vh - 180px);
      padding: 20px;
    }
  }
}

.light-gallery{
  li{
    &:before{
      background: none !important;
    }
  }
}
</style>
