<template>
  <div class="DocumentBlock">
    <span>
      {{document.name}}
<!--      <JumpText :text="document.name" :color="'#EC4D77'" />-->
    </span>

    <a :href="document.path" download>
      <IconBase width="25"
                height="25"
                :icon-color="svgColor"
                view-box="-23 0 512 512.00072">
        <IconUploadDocument />
      </IconBase>
    </a>
  </div>
</template>

<script>
  import IconBase from "./icons/IconBase";
  import IconUploadDocument from "./icons/IconUploadDocument";
  import JumpText from "@/components/JumpText";

  export default {
    name: "DocumentBlock",
    props: ['document'],
    components: {JumpText, IconBase, IconUploadDocument},
    data() {
      return {
        svgColor: '#46A4B5'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .DocumentBlock{
    padding: 10px 20px 5px;
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
      margin-bottom: 8px;
      margin-right: 20px;
      color: var(--palette-1);
      font-size: 20px;
      font-family: 'Kosko';
    }
  }
</style>