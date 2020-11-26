<template>
  <div id="loader">
    <div class="yellow"></div>
    <div class="red"></div>
    <div class="blue"></div>
    <div class="violet"></div>
  </div>
</template>

<script>
export default {
  name: "TheLoader"
}
</script>

<style lang="scss" scoped>
  #loader{
    position: fixed;
    top: 0;
    left: calc(50% - 48px);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin: 7px;
      background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
      animation: bounce 1.5s 0.5s linear infinite;
    }
    .yellow {
      background-color: var(--palette-4);
    }

    .red {
      background-color: var(--palette-1);
      animation-delay: 0.1s;
    }

    .blue {
      background-color: var(--palette-5);
      animation-delay: 0.2s;
    }

    .violet {
      background-color: var(--palette-2);
      animation-delay: 0.3s;
    }

    @keyframes bounce {
      0%, 50%, 100% {
        transform: scale(1);
        filter: blur(0px);
      }
      25% {
        transform: scale(0.6);
        filter: blur(3px);
      }
      75% {
        filter: blur(3px);
        transform: scale(1.4);
      }
    }
  }
</style>