<template>
  <div class="app-content">
    <Table ref="Table" class="el-table-mh-200" :props="config.modules.table" :pager="pager" :data="tableData" @handleSizeChange="handleSizeChange" 
      @handlePagerChange="handlePagerChange" @handleBtnEmit="handleBtnEmit" />
    <!-- 新增&编辑 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="55%" :before-close="handleClose">
      <Form :props="config.modules.form" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Share/Table/index'
import Form from '@/components/Share/Information/index'
import config from './config'
import * as API from '@/api'
export default {
  name: 'interfaceInfo',
  components: {
    Table,
    Form
  },
  data() {
    return {
      config: config,
      tableData: [],
      pager:{
        total: 0,
        offset: 1,
        range: 10,
        pageSizes: [10, 20, 50, 100],
      },
      dialogVisible: false,
    }
  },
  methods: {
    // 按钮处理
    handleBtnEmit(btnName, selection) {
      this.dialogVisible = true
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