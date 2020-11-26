<template>
  <aside :class="{hide_aside: !aside.show}">
    <div v-if="aside.show && $route.name !== 'Panel'" class="aside-list">
      <transition-group name="slide-fade"
                        @before-enter="animBeforeEnter"
                        @after-enter="animAfterEnter"
                        tag="div">
        <router-link v-for="(el, index) in aside.asideList" tag="li"
                     :data-index="index"
                     :key="el.section"
                     class="nav-item" axact :to="{name: aside.component, params: {section: el.section} }"
                     active-class="active">
          {{ el.name }}
        </router-link>
      </transition-group>
    </div>

    <!--для админа-->
    <div v-if="aside.show && $route.name === 'Panel'" class="aside-list">
      <router-link tag="li" class="nav-item" to="/panel/common" active-class="active">Общие</router-link>
      <router-link tag="li" class="nav-item" to="/panel/documents" active-class="active">Документы</router-link>
      <router-link tag="li" class="nav-item" to="/panel/video" active-class="active">Видео</router-link>
      <router-link tag="li" class="nav-item" to="/panel/scenario" active-class="active">Сценарии</router-link>
    </div>

    <div class="aside-burger" @click="showAside">
      <BurgerIcon :active="aside.show"  />
    </div>
  </aside>
</template>

<script>
  import BurgerIcon from "./BurgerIcon";

  export default {
    name: "TheAside",
    components: {BurgerIcon},
    computed: {
      aside() {
        return this.$store.getters.aside;
      }
    },
    methods: {
      showAside() {
        this.$store.dispatch('showAside', !this.aside.show)
      },
      animBeforeEnter(el) {
        el.style.transitionDelay = el.dataset.index * 400 + 'ms';
      },
      animAfterEnter(el) {
        el.style.transitionDelay = '0s';
      }
    }
  }
</script>

<style lang="scss" scoped>
aside{
  flex: 300px 0 0;
  min-height: 100%;
  border-right: var(--border-markup);
  padding: 20px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0s;

  &.hide_aside{
    flex: 0;
    border-width: 0;
    transition: all .5s;

    .aside-burger{
      opacity: .5;
    }
  }

  .aside-list{
    position: relative;
    
    li{
      display: block;
      font-family: var(--cartoon-font-family);
      font-size: 1.25rem;
      letter-spacing: 1px;
      cursor: pointer;
      padding: 12px 0;
      text-align: center;
      position: relative;

      &:before{
        @include pseudo;
        left: calc(50% - 10px);
        width: 20px;
        height: 2px;
        background-color: var(--palette-2);
      }

      &:last-child{
        &:after{
          @include pseudo;
          left: calc(50% - 10px);
          width: 20px;
          height: 2px;
          background-color: var(--palette-2);
          top: inherit;
          bottom: 0;
        }
      }

      &.active{
        color: var(--link-color-hover);
      }
    }
  }

  .aside-burger{
    position: absolute;
    top: 10px;
    right: 10px;
  }

}
</style>