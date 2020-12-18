<template>
  <div class="vue-carousel">
    <VueAgile :options="options1" :as-nav-for="asNavFor1" ref="main" class="main">
      <div class="slide"
           :key="i"
           :class="`slide--${i}`"
           v-for="(slide, i) in slides">
        <img :src="slide" />
      </div>
    </VueAgile>

    <VueAgile :options="options2" :as-nav-for="asNavFor2" ref="thumbnails" class="thumbnails">
      <div class="slide slide--thumbniail"
           :key="i"
           :class="`slide--${i}`"
           @click="$refs.thumbnails.goTo(i)"
           v-for="(slide, i) in slides">
        <img :src="slide" />
      </div>

      <template slot="prevButton"> <i class="fas fa-chevron-left" /> </template>
      <template slot="nextButton"> <i class="fas fa-chevron-right" /> </template>
    </VueAgile>
  </div>
</template>

<script>
import {VueAgile} from "vue-agile";

export default {
  name: "VueSlider",
  components: {VueAgile},
  props: ['photos'],
  data: () => ({
    asNavFor1: [],
    asNavFor2: [],
    options1: {
      dots: false,
      fade: true,
      navButtons: false
    },
    options2: {
      autoplay: true,
      autoplaySpeed: 7000,
      centerMode: true,
      dots: false,
      slidesToShow: 4
    },
    slides: []
  }),
  watch: {
    photos() {
      // для разработки
      // this.slides = this.photos.map(el => `http://localhost:8081${el.path}`)

      // для прода
      this.slides = this.photos.map(el => el.path);

      setTimeout(() => {
        this.$refs.thumbnails.reload();
        this.$refs.main.reload();
      }, 300);
    }
  },
  mounted () {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  }
}
</script>

<style lang="scss">

.vue-carousel{
  .thumbnails{
    margin: 0 -5px;
    width: calc(100% + 10px);
  }

  // Basic VueAgile styles
  .agile{
    max-width: 1000px;
    margin: 30px auto;

    &__nav-button{
      background: transparent;
      border: none;
      color: var(--palette-1);
      cursor: pointer;
      font-size: 24px;
      transition-duration: .3s;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &--prev {
        left: -45px;
      }

      &--next{
        right: -45px;
      }

      &:hover{
        color: var(--palette-2);
      }
    }
  }

  // Slides styles
  .slide{
    align-items: center;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    height: 450px;
    justify-content: center;

    &--thumbniail{
      cursor: pointer;
      height: 100px;
      padding: 0 5px;
      transition: opacity .3s;

      &:hover{
        opacity: .75;
      }
    }

    img{
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100% ;
    }
  }
}

</style>