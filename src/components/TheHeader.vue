<template>
  <header>
    <div class="container header">
      <router-link tag="div" style="cursor: pointer;" exact to="/">
        <v-logo-name />
      </router-link>

      <nav>
        <router-link tag="li" class="nav-item" exact to="/" active-class="active">
          <a class="nav-link">Главная</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/documents" active-class="active">
          <a class="nav-link">Документы</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/video" active-class="active">
          <a class="nav-link">Видео</a>
        </router-link>
        <router-link tag="li" class="nav-item" to="/scenario" active-class="active">
          <a class="nav-link">Сценарии</a>
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
  background: linear-gradient(135deg, rgba(175, 167, 227, 0.8), rgba(211, 255, 232, 0.7));
  border-bottom: 2px solid $color-purple;
  height: 130px;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  nav{
    .nav-item{
      font-family: 'Kosko';
      font-size: 24px;
      padding: 0;
      display: inline-block;
      margin-right: 25px;
      list-style: none;
      &:last-child{
        margin-right: 0;
      }

      &.active{
        a{
          color: #EC4D77;
        }
      }

      a{
        text-decoration: none;
        &:hover{
          color: #F4809A;
        }
      }
    }
  }
}
</style>