<template>
  <div>
    <h2>这是路由的测试</h2>
    <el-button type="primary" size="mini" @click="linkPage">跳转</el-button>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    linkPage() {
      this.$router.push({
        name: 'MyFirstRoute'
      })
    }
  }
}
</script>