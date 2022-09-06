<template>
  <div class="first-route-detail">
    <h3>{{title}}</h3>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="跳转1" name="1">111</el-tab-pane>
      <el-tab-pane label="跳转2" name="2">222</el-tab-pane>
      <div>11</div>
    </el-tabs>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'MyFirstRoute',
  props: {
    id: {
      type: Number,
      default: ()=> {
        return 1
      }
    },
    title: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      activeName: '0'
    }
  },
  mounted() {
    console.log(this.id)
  },
  methods: {
    handleClick({name}) {
      if(name === '1') {
        this.$router.push({
          name: 'News'
        })
      }else {
        this.$router.push({
          name: 'Message'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.first-route-detail {
  width: 30%;
}
</style>