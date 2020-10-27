<template>
  <div class="DocumentBlock">
    <IconBase width="25"
              height="25"
              :icon-color="svgColor"
              view-box="0 0 480 480">
      <IconDocument />
    </IconBase>
    <a :href="document.path" download>{{ document.name }}</a>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconDocument from "./icons/IconDocument";

  export default {
    name: "DocumentBlock",
    props: ['document'],
    components: {IconBase, IconDocument},
    data() {
      return {
        svgColor: '#00565B'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .DocumentBlock{
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    a{
      margin-left: 10px;
      text-decoration: none;
      color: $main-color;
    }
  }
</style>