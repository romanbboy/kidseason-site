<template>
  <div id="PanelPage">
    <EmptyBlock v-if="!section" />

    <template v-else>
      <!--COMMON-->
      <PanelCommon v-if="section === 'common'" />

      <!--DOCUMENTS-->
      <PanelDocuments v-if="section === 'documents'" />

      <!--VIDEO-->
      <PanelVideos v-if="section === 'video'" />

      <!--SCENARIO-->
      <PanelScenarios v-if="section === 'scenario'" />

      <!--PHOTO-->
      <PanelPhotos v-if="section === 'photo'" />
    </template>
  </div>
</template>

<script>
  import md5 from "../utils/md5";
  import EmptyBlock from "@/components/EmptyBlock";
  import PanelCommon from "@/components/PanelCommon";
  import PanelDocuments from "@/components/PanelDocuments";
  import PanelVideos from "@/components/PanelVideos";
  import PanelScenarios from "@/components/PanelScenarios";
  import PanelPhotos from "@/components/PanelPhotos";

  export default {
    name: "Panel",
    components: {
      PanelPhotos,
      PanelScenarios,
      PanelVideos,
      PanelDocuments,
      PanelCommon,
      EmptyBlock
    },
    computed: {
      section() {
        return this.$route.params['section']
      }
    },
    beforeCreate() {
      // let password = md5(prompt('Введи пароль'));
      // qaz123wsxLorka
      // if(password !== '1401eee95caf8ed45464912964da645b') this.$router.push('/');
    }
  }
</script>

<style lang="scss">
  #PanelPage{
    height: 100%;

    .panel-category{
      .pc-wrap{
        margin-bottom: 30px;

        p{
          border-bottom: var(--border-markup);
          width: fit-content;
        }

        .list{
          display: flex;
          flex-wrap: wrap;
        }
      }
    }

    form{
      .form-control{
        margin-bottom: 10px;

        label{
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }
        input{
          width: 100%;
        }
      }

      .actions{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 15px 0;
      }
    }


    .form-add{
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 30px;
    }
  }
</style>