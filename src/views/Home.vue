<template>
  <div id="HomePage">
    <section class="section">
      <div class="container">
        <div class="owner-info">
          <AvatarBlock />

          <div class="owner-info--info">
            <h2><span class="color-blue">Мороз</span> <span class="color-pink">Лариса</span> <span class="color-orange">Яковлевна</span></h2>
            <p>Супер кошечка))</p>
            <p><b>Должность:</b> мама троих высоких детей</p>
            <p><b>Стаж:</b> 28 лет</p>
            <p>49 лет, выглядит на <b>24</b> года</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-3">
      <div class="container">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium alias animi at consequatur cum dolorem dolores error eum explicabo harum ipsum itaque laboriosam laudantium nemo, nesciunt nobis nulla perferendis perspiciatis, possimus quas quia quibusdam quis quo ratione repellat sapiente sed sint, soluta voluptatum. Aut ipsum minus, officiis quam quo repellat sapiente sed vel voluptatum! Architecto delectus deserunt fugiat ipsum maxime minus modi nam, non saepe ullam, vel, veniam. Iusto laborum necessitatibus nisi quisquam tempore voluptas voluptatibus. Autem dignissimos dolore eos inventore odit optio pariatur quaerat tempore! Accusamus corporis cupiditate dolores explicabo, illum ipsa modi molestiae molestias mollitia, neque officia quas quos sed tenetur voluptas! Asperiores assumenda libero numquam quam sint. A ad alias aliquid animi aspernatur consectetur cum doloribus eligendi enim eos et excepturi facilis fugiat in ipsum iste, itaque iusto laboriosam laborum libero modi nisi placeat qui quibusdam quidem quod reiciendis saepe sapiente, sunt ullam! Doloribus iusto, necessitatibus. Alias distinctio dolor dolorum earum, fugiat hic ipsa ipsam magnam necessitatibus, nobis odit pariatur sunt vitae voluptatem voluptates. Accusantium dolorum esse et, iusto odit pariatur quo. Accusamus aut blanditiis deleniti dolore, eligendi est impedit minus nemo nihil, obcaecati optio quae quibusdam quis quo tempora unde, ut velit! .</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci amet atque commodi corporis cum cumque debitis deserunt dicta, dolor, dolore ducimus ea ex exercitationem expedita facilis fuga fugiat hic illum in ipsum itaque laudantium neque officia pariatur quae qui quia repellendus saepe sequi sit tempora vitae voluptatibus? Corporis cumque et magni minima rem. Ducimus eaque eius est itaque laborum voluptas, voluptatum! Accusamus aut consequatur cum cupiditate debitis dicta doloribus eius eligendi eos esse et eum expedita explicabo facilis fuga harum ipsam iste iure, maiores molestiae nemo nobis non numquam porro praesentium qui quidem rerum sed soluta unde voluptate voluptatibus!</p>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="mv-5 pb-5 border-bottom--blue">
          <h2>Последние документы</h2>
          <div class="flex">
            <DocumentBlock v-for="doc in lastDocuments" :document="doc" :key="doc._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5 border-bottom--blue">
          <h2>Последние видео</h2>
          <div class="flex flex-main-between">
            <VideoBlock v-for="video in lastVideos" :video="video" :key="video._id"/>
          </div>
        </div>
        <div class="mv-5 pb-5">
          <h2>Последние сценарии</h2>
          <div class="flex">
            <ScenarioBlock v-for="el in lastScenarios" :scenario="el" :key="el._id"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import AvatarBlock from "../components/AvatarBlock";
import DocumentsService from "@/services/DocumentsService";
import VideosService from "@/services/VideosService";
import ScenariosService from "@/services/ScenariosService";

import DocumentBlock from "@/components/DocumentBlock";
import VideoBlock from "@/components/VideoBlock";
import ScenarioBlock from "@/components/ScenarioBlock";

export default {
  name: 'Home',
  components: {
    ScenarioBlock,
    VideoBlock,
    DocumentBlock,
    AvatarBlock
  },
  data() {
    return {
      lastDocuments: [],
      lastVideos: [],
      lastScenarios: [],
    }
  },
  created() {
    this.$store.dispatch('showAside', false)
  },
  async mounted() {
    const lastDocuments = await DocumentsService.fetchDocuments(5);
    const lastVideos = await VideosService.fetchVideos(3);
    const lastScenarios = await ScenariosService.fetchScenarios(5);

    this.lastDocuments = lastDocuments.data.documents;
    this.lastVideos = lastVideos.data.videos;
    this.lastScenarios = lastScenarios.data.scenarios;
  }
}
</script>

<style lang="scss" scoped>
  .owner-info{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;

    &--info{
      clip-path: polygon(0% 100%, 0% 100%, 0% 0%, 0% 0%);
      margin-left: 70px;
      animation: appear-polygon 1s forwards 1.2s;

      p{
        text-align: center;
        margin-bottom: var(--grid-atom);
      }
    }
  }
</style>
