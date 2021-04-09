<template>
  <div class="ScenarioBlock">
    <div class="ScenarioBlock__name">{{ scenario.name }}</div>
    <div class="ScenarioBlock__text" v-html="scenario.content.substr(0, 200)+'...'"></div>

    <div class="ScenarioBlock__link">
      <router-link tag="a"
                   :key="scenario.sign"
                   :to="{name: `${target}Full`, params: {section: scenario.section, [`name${target}`]: scenario.sign} }">
        <IconBase width="22"
                  height="22"
                  :icon-color="svgColor"
                  view-box="0 0 511.999 511.999">
          <IconEye />
        </IconBase>
      </router-link>
    </div>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconEye from "./icons/IconEye";

  export default {
    name: "ScenarioBlock",
    props: ['scenario', 'target'],
    components: {IconBase, IconEye},
    data: () => ({
      svgColor: '#00565B'
    })
  }
</script>

<style lang="scss" scoped>
  .ScenarioBlock{
    padding: 10px 20px 10px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 24px var(--plate-shadow);
    margin-bottom: 15px;
    transition: box-shadow .3s;
    margin-right: 30px;
    position: relative;
    max-width: 50%;

    &:hover{
      box-shadow: 0 0 12px var(--plate-hover-shadow);
    }

    &__name{
      font-size: 24px;
      margin-bottom: 8px;
      color: var(--palette-1)
    }

    &__text{
      /deep/ p {
        margin-bottom: 5px;
      }
    }

    &__link {
      position: absolute;
      bottom: 0;
      right: 10px;
    }
  }
</style>