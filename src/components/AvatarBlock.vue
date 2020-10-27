<template>
  <div class="avatar">
    <img src="../assets/img/edging.png" alt="" class="edging">
    <img class="avatar-img" src="../assets/img/avatar.jpg" />
  </div>
</template>

<script>
  export default {
    name: "AvatarBlock"
  }
</script>

<style lang="scss" scoped>
  @keyframes rotate-infinite {
    100%{
      transform: scale(1.1) rotate(360deg);
    }
  }
  @keyframes appear-rotate-y {
    100%{
      opacity: 1;
      transform: translateX(0) rotateY(720deg);
    }
  }

  .avatar{
    opacity: 0;
    transform: translateX(-150px);
    position: relative;
    width: 250px;
    height: 250px;
    animation: appear-rotate-y .8s forwards 1s;

    .edging{
      position: absolute;
      top: -30px;
      left: -30px;
      width: calc(100% + 60px);
      height: calc(100% + 60px);
      animation: rotate-infinite 100s linear infinite;
    }

    .avatar-img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      z-index: 2;
    }
  }
</style>