<template>
  <footer>
    Footer
  </footer>
</template>

<script>
  export default {
    name: "TheFooter"
  }
</script>

<style lang="scss" scoped>
  footer{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: 'Kosko';
    border-top: $border;
    background: linear-gradient(45deg, rgba(175, 167, 227, 0.8), rgba(211, 255, 232, 0.7));
  }
</style>