<template>
  <span v-if="word === ' '" v-html="' '"></span>
  <span v-else :style="{color: color, animationDelay: animationDelay, animationDuration: animationDuration}">{{ word }}</span>
</template>

<script>
import randomColor from '@/utils/randomColor';
import {randomFloatNumber} from "@/utils/randomNumber";

export default {
  name: 'JumpTextWord',
  props: ['word'],
  data: () => ({
    color: randomColor(),
    animationDelay: randomFloatNumber(0, 3) + 's',
    animationDuration: randomFloatNumber(0, 1) + 's',
  })
}
</script>

<style scoped>
  @keyframes rain {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  span{
    opacity: 0;
    animation-name: rain;
    animation-fill-mode: forwards;
    font-family: 'Kosko';
    display: inline-block;
  }
</style>