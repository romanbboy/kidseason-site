<template>
  <div class="ScenarioBlock">
    <span>{{ scenario.name }}</span>

    <router-link tag="a"
                 :key="scenario.sign"
                 :to="{name: 'ScenarioFull', params: {section: $route.params['section'], nameScenario: scenario.sign} }">
      <IconBase width="22"
                height="22"
                :icon-color="svgColor"
                view-box="0 0 511.999 511.999">
        <IconEye />
      </IconBase>
    </router-link>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconEye from "./icons/IconEye";

  export default {
    name: "ScenarioBlock",
    props: ['scenario'],
    components: {IconBase, IconEye},
    data() {
      return {
        svgColor: '#00565B'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ScenarioBlock{
    padding: 10px 20px 10px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 24px var(--plate-shadow);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    transition: box-shadow .3s;
    margin-right: 30px;

    &:hover{
      box-shadow: 0 0 12px var(--plate-hover-shadow);
    }

    span{
      margin-right: 15px;
      margin-bottom: 1px;
      color: var(--palette-1)
    }

    a{
      line-height: 0;
    }
  }
</style>