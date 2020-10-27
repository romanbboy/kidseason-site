<template>
  <aside :class="{hide: !show}">
    <div v-if="show" class="aside-list">
      <transition-group name="slide-fade"
                        @before-enter="animBeforeEnter"
                        @before-leave="animBeforeLeave"
                        tag="div">
        <router-link v-for="(el, index) in asideList" tag="li"
                     :data-index="index"
                     :key="el.section"
                     class="nav-item" :to="{name: $route.name, params: {section: el.section} }"
                     active-class="active">
          {{ el.name }}
        </router-link>
      </transition-group>
    </div>

    <div class="aside-burger" @click="showAside">
      <BurgerIcon :active="show"  />
    </div>
  </aside>
</template>

<script>
  import BurgerIcon from "./BurgerIcon";

  export default {
    name: "TheAside",
    components: {BurgerIcon},
    data() {
      return {
        // show: this.$store.getters.aside.show
      }
    },
    computed: {
      asideList() {
        return this.$store.getters.aside.asideList
      },
      show() {
        return this.$store.getters.aside.show;
      }
    },
    methods: {
      showAside() {
        this.$store.dispatch('showAside', !this.$store.getters.aside.show)
      },
      animBeforeEnter(el) {
        el.style.transitionDelay = el.dataset.index * 400 + 'ms';
      },
      animBeforeLeave(el) {
        el.style.transitionDelay = '0s';
      }
    }
  }
</script>

<style lang="scss" scoped>
aside{
  flex: 300px 0 0;
  min-height: 100%;
  border-right: $border;
  border-width: 3px;
  padding: 20px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0s;

  &.hide{
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
      padding: 0;
      list-style: none;
      font-family: 'Kosko';
      font-size: 18px;
      margin-bottom: 10px;
      letter-spacing: 1px;
      cursor: pointer;

      &.active{
        color: $main-color;
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