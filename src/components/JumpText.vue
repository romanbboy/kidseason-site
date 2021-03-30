<template>
  <div class="jump-text" ref="jumpText" :style="{fontSize: fontSize, textAlign: textAlign}">
    <JumpTextWord v-for="(word, i) in content" :word="word" :key="i" />
  </div>
</template>

<script>
import JumpTextWord from "@/components/JumpTextWord";

export default {
  name: 'JumpText',
  components: {JumpTextWord},
  props: ['text', 'fontSize', 'textAlign'],
  data: () => ({
    content: []
  }),
  mounted() {
    this.content = this.text.split('')
  }
}
</script>

<style lang="scss" scoped>

</style>