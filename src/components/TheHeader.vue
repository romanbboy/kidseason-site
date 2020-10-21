<template>
  <header>
    <div class="container header">
      <v-logo-name />

      <nav>
        <router-link tag="li" class="nav-item" exact to="/" active-class="active">
          <a class="nav-link">Главная</a>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
  import LogoName from '@/components/LogoName.vue'

  export default {
    name: "TheHeader",
    components: {
      vLogoName: LogoName
    }
  }
</script>

<style lang="scss" scoped>
header{
  padding: 15px 0;
  background: linear-gradient(90deg, #aea4e3, #d3ffe8);
  border-bottom: 3px solid #aea4e3;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav{

  }
}
</style>