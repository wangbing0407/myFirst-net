<template>
  <div class="content">
    <!-- 运营状况 -->
    <div class="main-info">
      <el-card class="info">
        <el-button type="primary" icon="el-icon-user-solid" circle />
        <h2 class="num-info">112356</h2>
        <p class="desc">总接口数</p>
      </el-card>
      <el-card class="info">
        <el-button type="success" icon="el-icon-s-data" circle />
        <h2 class="num-info">66789</h2>
        <p class="desc">总课程数</p>
      </el-card>
      <el-card class="info">
        <el-button type="danger" icon="el-icon-coin" circle />
        <h2 class="num-info">12457</h2>
        <p class="desc">总订单数</p>
      </el-card>
      <el-card class="info">
        <el-button type="warning" icon="el-icon-data-line" circle />
        <h2 class="num-info">998989.12</h2>
        <p class="desc">总收入</p>
      </el-card>
    </div>
    <!-- 图表 -->
    <div class="chart-info">
      <div class="chart-arrange">
        <div class="layer" id="relationShip"></div>
        <div class="layer" id="one-chart"></div>
      </div>
      <div class="chart-arrange">
        <div class="cus-pie layer">
          <el-select v-if="isSelect" v-model="pieValue" size="mini" placeholder="请选择" @change="changePieV">
            <el-option v-for="item in moduleOpts" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <div id="pie-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api'
import * as Utils from '@/vendor/utils'

export default {
  data() {
    return {
      initData: {},
      moduleOpts: [
        {
          value: 'PLM',
          label: 'PLM'
        },
        {
          value: 'PBI',
          label: 'PBI'
        },
        {
          value: 'IDP',
          label: 'IDP'
        },
      ],
      isSelect: false,
      pieValue: 'PLM',
    };
  },
  created() {
    // this.initPage();
  },
  mounted() {
    this.getRelationShipData()
    this.getSystemInterfaceData();
    this.getPieData()
  },
  methods: {
    // 初始化数据
    async initPage() {
      const result = await this.$axios.get("/manage/init");
      if (result.data.success) {
        Object.assign(this.initData, result.data.data);
      } else {
        this.$message.error(result.data.message);
      }
    },
    getRelationShipData() {
      API.callRequest('http://localhost:8989/poVisualize/getRelatedChartData').then(({data}) => {
        console.log('关系图数据---------------------', data);
        if (data.status) {
          this.initRelationShip(data.data)
        }else {
          this.$message.error(data.message || '删除失败！');
        }
      }).catch(err => {
        const list = [
          {
            "key": "PLM",
            "value": 2.0,
            "interfaceDirector": "from",
            "involvingSystem": "PBI"
          },
          {
            "key": "PBI",
            "value": 1.0,
            "interfaceDirector": "from",
            "involvingSystem": "PLM"
          },
          {
            "key": "IDP",
            "value": 1.0,
            "interfaceDirector": "to",
            "involvingSystem": "PBI"
          }
        ]
        this.initRelationShip(list)
      })
    },
    getSystemInterfaceData() {
      API.callRequest('http://localhost:8989/poVisualize/getBarChartData').then(({data}) => {
        console.log('柱状图数据---------------------', data);
        if (data.status) {
          this.initSystemInterface(data.data)
        }else {
          this.$message.error(data.message || '删除失败！');
        }
      }).catch(err => {
        const list = [{"key":"PLM","value":2},{"key":"PBI","value":3}]
        this.initSystemInterface(list)
      })
    },
    getPieData() {
      let params = [{"key": "belongToSystem","value": this.pieValue}]
      API.callRequest('http://localhost:8989/poVisualize/getPieChartData', params).then(({data}) => {
        console.log('饼图数据---------------------', data);
        if (data.status) {
          this.isSelect = true
          this.initPie(data.data)
        }else {
          this.$message.error(data.message || '删除失败！');
        }
      }).catch(err => {
        const list = [{"key":"Doc","value":"3","percentage":"10%"},{"key":"Part","value":"2","percentage":"25%"}]
        this.isSelect = true
        this.initPie(list)
      })
    },
    changePieV(v) {
      this.pieValue = v
      this.getPieData()
    },
    // 获取关系图数据
    initRelationShip(data) {
      let nodeData = []
      let linkData = []
      const defaultConfig = {
        label: {
          show: true,
          fontSize: 10
        }
      }
      if (data.length > 0) {
        const colors = [
          '#45b13e', '#e67742', '#42b1e6', '#42c8e6', '#dce642', '#d5491f', '#dae718', '#89a7dd'
        ]
        data.forEach((r, index) => {
          nodeData.push(
            { name: r.key, x: Math.ceil(Math.random() * 4), y: Math.ceil(Math.random() * 6),itemStyle:{color: colors[index]} }
          )
          if (r.interfaceDirector === 'from') {
            linkData.push(
              Object.assign({ source: r.involvingSystem, target: r.key }, defaultConfig) 
            )
          } else {
            linkData.push(
              Object.assign({ source: r.key, target: r.involvingSystem }, defaultConfig) 
            )
          }
        })
      }
      const relationChart = this.$echarts.init(document.getElementById("relationShip"), null, { width: 600, height: 400 });
      const option = {
        title: {
          text: '集成关系'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: nodeData,
            // links: [],
            links: linkData,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0.2
            }
          }
        ]
      };

      relationChart.setOption(option)
    },
    // 获取系统接口数据
    initSystemInterface(data) {
      let xName = []
      let infoList = []
      const colors = [
        '#45b13e', '#e67742', '#42b1e6', '#42c8e6', '#dce642', '#d5491f', '#dae718', '#89a7dd'
      ]
      if (data.length > 0) {
        data.forEach((r, index) => {
          xName.push(r.key)
          infoList.push(
            {value: r.value, itemStyle:{color: colors[index]}}
          )
        })
      }
      var myChart = this.$echarts.init(document.getElementById("one-chart"), null, { width: 600, height: 400 });
      //配置图表
      var option = {
        tooltip: {},
        legend: {
          data: ["系统接口"],
        },
        xAxis: {
          data: xName
        },
        yAxis: {},
        series: [
          {
            name: "系统接口",
            type: "bar",
            data: infoList,
          },
        ],
      };
      myChart.setOption(option);
    },
    initPie(data) {
      let pieData = []
      if(data.length > 0) {
        data.forEach(r => {
          pieData.push(
            { value: r.value, name: r.key }
          )
        })
      }
      var myChart = this.$echarts.init(document.getElementById("pie-chart"), null, { width: 600, height: 400 });
      const option = {
        title: {
          text: '分类信息',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-info {
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding: 10px 0px;
  background: white;
  min-width: 800px;
  border-radius: 8px;
  .info {
    background: white;
    width: 18%;
    height: 80%;
    align-self: center;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    .num-info {
      margin: 10px 0px;
    }
    .desc {
      font-size: 10px;
      color: gray;
    }
  }
}
.chart-info {
  background-color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  .chart-arrange {
    display: flex;
    justify-content: space-around;
    padding: 20px 0px;
    .layer {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      padding: 20px;
      border-radius: 5px;
    }
  }
  .cus-pie {
    display: flex;
    flex-direction: row-reverse;
  }
}

.e-chart {
  padding-top: 10px;
  width: 49%;
  height: auto;
  min-width: 500px;
}
</style>