<template>
  <div>
    <!-- template不能与v-show一起使用 -->
    <template v-if="true">
      <h2>v-if和v-show</h2>
      <h3>222</h3>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>