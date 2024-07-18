<template>
  <div class="app-content">
    <Table ref="Table" class="el-table-mh-200" :props="config.modules.table" :pager="pager" :data="tableData" @handleSizeChange="handleSizeChange" 
      @handlePagerChange="handlePagerChange" @handleBtnEmit="handleBtnEmit" @handleShowGragh="handleShowGragh" />
    <!-- 新增&编辑 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="55%" :before-close="handleClose">
      <Form :props="config.modules.form" :data="formData" @handleFormUpliadFile="handleFormUpliadFile" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </el-dialog>
    <!-- 指向关系图 弹出框 -->
    <el-dialog :visible.sync="visibleGraph" width="55%" :before-close="handleClose">
      <Graph :data="graphData" />
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Share/Table/index'
import Form from '@/components/Share/Information/index'
import Graph from '@/components/Share/Graph/index'
import config from './config'
import * as API from '@/api'
import * as Utils from '@/vendor/utils'
export default {
  name: 'interfaceInfo',
  components: {
    Table,
    Form,
    Graph
  },
  data() {
    return {
      config: config,
      tableData: [],
      formData: {},
      pager:{
        total: 0,
        offset: 1,
        range: 10,
        pageSizes: [10, 20, 50, 100],
      },
      dialogVisible: false,
      visibleGraph: false,
      graphData: {}
    }
  },
  mounted() {
    this.tableData = config.mockData
    this.pager.total = config.mockData.length
  },
  methods: {
    // 按钮处理
    handleBtnEmit(btnName, selectData) {
      if (btnName === 'add') {
        this.dialogVisible = true
      }
      if (btnName === 'edit') {
        if (selectData && selectData.length < 1) {
          Utils.messageBox(this, '请选择数据')
          return
        }
        this.dialogVisible = true
      }
      if (btnName === 'delete') {
        if (selectData && selectData.length < 1) {
          Utils.messageBox(this, '请选择数据')
          return
        }
        this.$confirm(`请确认是否对选中的${selectData.length}条数据做删除？`, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.callRequest('', {json: []}).then(({data}) => {
            
          })
        })
      }
    },
    handleShowGragh(scope) {
      this.graphData = scope.row
      this.visibleGraph = true
    },
    handleFormUpliadFile(fileRaw) {
      debugger
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    handleClose(done) {
      done()
    },
    handleSizeChange() {},
    handlePagerChange() {},
  }
}
</script>

<style scoped lang="scss">
.app-content {
  /* height: 100%; */
  min-height: calc(100% - 64px);
  margin: 20px 0px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.08) 2px 2px 2px;
  box-shadow: rgba(0, 0, 0, 0.08) 2px 2px 2px;
  padding: 15px 20px 15px;
    border-radius: 8px;
    background: #fff;
}
</style>