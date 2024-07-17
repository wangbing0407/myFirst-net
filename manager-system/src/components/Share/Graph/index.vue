<template>
  <div>
    <div style="height:calc(100vh - 60px);">
       <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
    </div>
  </div>
</template>

<script>
// relation-graph也支持在main.js文件中使用Vue.use(RelationGraph);这样，你就不需要下面这一行代码来引入了。
import RelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { RelationGraph },
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      graphOptions: {
        defaultJunctionPoint: 'border',
        defaultLineWidth: 3,
        disableDragNode: true,
        graphOffset_y: -100,
        layout:  {
          layoutName:  'tree',
          from:  'left', 
        //  min_per_width:  200,
          // min_per_height:  200
        }
        // 这里可以参考"Graph 图谱"中的参数进行设置 https://www.relation-graph.com/#/docs/graph
      }
    }
  },
  mounted() {
    console.log('集成方向的数据-----',this.data);
    this.showGraph()
  },
  methods: {
    showGraph() {
      const jsonData = {
        rootId: 'PBI',
        nodes: [
          { id: 'PBI', text: 'PBI', borderColor: 'yellow', nodeShape: 0, },
          { id: 'ERP', text: 'ERP', color: '#43a2f1', nodeShape: 0, fontColor: 'yellow' },
          // { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
          // { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
          { from: 'PBI', to: 'ERP', text: '关系1', useTextPath: true, color: '#43a2f1' },
          // { from: 'a', to: 'c', text: '关系2' },
          // { from: 'a', to: 'e', text: '关系3' },
          // { from: 'b', to: 'e', color: '#67C23A' }
        ]
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.graphRef.setJsonData(jsonData, (graphInstance) => {
        // Called when the relation-graph is completed
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  }
}
</script>