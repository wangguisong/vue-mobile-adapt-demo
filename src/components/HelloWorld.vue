<template>
  <div class="hello">
    测试文字
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../pagefit.scss";
.hello{
  width: px2rem(375px);
  height: px2rem(375px);
  // font-size: px2rem(24px);
  font-size: 24px;
  [data-dpr="2"] & {
    font-size: 48px;
  }
  [data-dpr="3"] & {
    font-size: 72px;
  }
  background: black;
  color: white;
}
</style>
