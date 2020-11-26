<template>
  <div class="empty-block">
    <img src="../assets/img/elements/rabbit--left.png" alt="">
  </div>
</template>

<script>
export default {
  name: "EmptyBlock"
}
</script>

<style lang="scss" scoped>
  .empty-block{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--cartoon-font-family);

    img{
      width: 300px;
    }
  }
</style>