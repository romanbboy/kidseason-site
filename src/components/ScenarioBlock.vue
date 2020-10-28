<template>
  <div class="ScenarioBlock">
    <IconBase width="25"
              height="25"
              :icon-color="svgColor"
              view-box="0 0 480 480">
      <IconDocument />
    </IconBase>

    <router-link tag="p"
                 :key="scenario.urlName"
                 :to="{name: 'ScenarioFull', params: {section: $route.params['section'], nameScenario: scenario.urlName} }">
      {{ scenario.name }}
    </router-link>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconDocument from "./icons/IconDocument";

  export default {
    name: "ScenarioBlock",
    props: ['scenario'],
    components: {IconBase, IconDocument},
    data() {
      return {
        svgColor: '#00565B'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ScenarioBlock{
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    p{
      margin-left: 10px;
      text-decoration: none;
      color: $main-color;
      cursor: pointer;
    }
  }
</style>