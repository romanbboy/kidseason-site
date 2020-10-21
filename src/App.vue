<template>
  <div id="application">
    <v-header />

    <main>
      <v-aside />
      <router-view></router-view>
    </main>

    <v-footer />

  </div>
</template>

<script>
  import TheHeader from '@/components/TheHeader.vue'
  import TheAside from '@/components/TheAside.vue'
  import TheFooter from '@/components/TheFooter.vue'

  export default {
    components: {
      vHeader: TheHeader,
      vAside: TheAside,
      vFooter: TheFooter
    }
  }
</script>

<style lang="scss">
@font-face {
  font-family: "Kosko";
  src: url(./assets/fonts/Kosko/Kosko.ttf) format("truetype");
  font-weight: 700;
  font-style: normal;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-size: 16px;
  background: linear-gradient(90deg, #b9deed, #efefef);
}

.container{
  max-width: 1440px;
  padding: 0 40px;
}
</style>
