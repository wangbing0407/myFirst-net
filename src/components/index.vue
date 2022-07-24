<template>
  <div class="index">
    <el-container>
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="watch与computed比较" name="pageA"></el-tab-pane>
        <el-tab-pane label="动态绑定样式" name="pageB"></el-tab-pane>
        <el-tab-pane label="条件渲染" name="pageC"></el-tab-pane>
        <el-tab-pane label="Vue数据监测" name="pageD"></el-tab-pane>
        <el-tab-pane label="Vue自定义指令" name="pageE"></el-tab-pane>
        <el-tab-pane label="Vue自定义事件" name="pageF"></el-tab-pane>
        <h2>{{name}}</h2>
        <keep-alive>
          <component ref="components" :is='pages' @handleSetVal="getEventVal" :changeMsg="setMsg"></component>
        </keep-alive>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>

import pageA from './page/WatchComputed.vue'
import pageB from './page/ClassStyl.vue'
import pageC from './page/ConditionRender.vue'
import pageD from './page/DataObserver.vue'
import pageE from './page/CustomInstructions.vue'
import pageF from './page/CustomEvents.vue'

export default {
  name: 'index',
  props: {
    msg: String
  },
  components: {
    pageA,
    pageB,
    pageC,
    pageD,
    pageE,
    pageF
  },
  data(){
    return {
      activeName: 'pageA',
      pages: 'pageA',
      name: 'WelCome'
    }
  },
  mounted(){
    console.log(this.$refs.components)
  },
  methods: {
    handleClick(val){
      this.pages = val
    },
    getEventVal(val){
      alert(val)
    },
    setMsg(val){
      this.name = val
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
