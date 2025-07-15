<template>
    <div class="lbt-container">
      <div class="lbt">
        <div class="lbt1">
          <img src="/images/lbt1.jpg">
        </div>
        <div class="lbt2">
          <img src="/images/lbt2.jpg">
        </div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="dots">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'StudentCoursesView',
  data () {
    return {
      courses: []
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  width: 1200px;
  height: 360px;
}
</style>
