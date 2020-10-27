<template>
  <div id="application" :class="`Bg-${page}`">
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

  export default {
    components: {
      vHeader: TheHeader,
      vAside: TheAside,
      vFooter: TheFooter
    },
    computed: {
      page() {
        return this.$route.name;
      }
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
    background-image: $main-gradient, url('./assets/img/bg/bg_home.jpg');
  }
  &.Bg-Video{
    background-image: $main-gradient, url('./assets/img/bg/bg_video.jpg');
  }
  &.Bg-Documents{
    background-image: $main-gradient, url('./assets/img/bg/bg_documents.jpg');
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
</style>
