<template>
  <div class="app-content">
    <Table ref="Table" class="el-table-mh-200" :props="config.modules.table" :pager="pager" :data="tableData" @handleSizeChange="handleSizeChange" 
      @handlePagerChange="handlePagerChange" @handleBtnEmit="handleBtnEmit" @handleImport="handleImport" @handleExport="handleExport"
      @handleShowGragh="handleShowGragh" />
    <!-- 新增&编辑 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="55%" :before-close="handleClose" :destroy-on-close="true" modal :close-on-click-modal="false">
      <Form :props="formConfig" :data="formData" @handleFormUpliadFile="handleFormUpliadFile" />
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirm">确认</el-button>
      </span>
    </el-dialog>
    <!-- 指向关系图 弹出框 -->
    <el-dialog :visible.sync="visibleGraph" width="55%" :before-close="handleClose" :destroy-on-close="true" modal :close-on-click-modal="false">
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
      formConfig: config.modules.form,
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
      graphData: {},
      formAttach: null,
      btnName: '',
    }
  },
  mounted() {
    // this.tableData = config.mockData
    // this.pager.total = config.mockData.length
    this.getTableData()
  },
  methods: {
    // 按钮处理
    handleBtnEmit(btnName, selectData) {
      this.btnName = btnName
      if (btnName === 'add') {
        this.formConfig = this.config.modules.form
        this.dialogVisible = true
      }
      if (btnName === 'edit') {
        if (selectData && selectData.length < 1) {
          Utils.messageBox(this, '请选择数据')
          return
        }
        this.editForm(selectData)
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
          let oidList = []
          selectData.forEach(r => {
            oidList.push(r.oid)
          })
          let form = new FormData()
          form.append('oidList', oidList)
          let loading = this.$loading()
          API.callRequest('/mindray/po/batchDeleteByOidList', form).then(({data}) => {
            if (data.status) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getTableData()
            }else {
              this.$message.error(data.message || '删除失败！');
            }
          }).finally(() => {
            loading && loading.close()
          })
        })
      }
    },
    // 导入
    handleImport(event) {
      let form = new FormData()
      form.append('file', event.target.files[0])
      let loading = this.$loading()
      API.callRequest('/mindray/po/importPOInfo', form).then(({data}) => {
        if (data.status) {
          this.$message({
            message: '导入成功！',
            type: 'success'
          });
          this.getTableData()
        }else {
          this.$message.error(data.message || '导入失败！');
        }
      }).finally(() => {
        loading && loading.close()
      })
    },
    // 导出
    handleExport(selectData) {
      API.callRequest('/mindray/po/exportPOInfo', {}).then(result => {
        let reader = new FileReader();
        reader.readAsText(result, 'utf-8');
        reader.onload = function () {
          //失败返回JSON数据 成功返回zip包文件流
          try {
              const res = JSON.parse(reader.result);
              if (res.success == false) {
                this.$message.error(reader.message || '下载失败！');
              }
          } catch (error) {
            Utils.downLoadBlobZip(result,'po文件')
          }
        }
      })
    },
    getTableData() {
      let form = new FormData()
      form.append('offset', this.pager.offset)
      form.append('range', this.pager.range)
      let loading = this.$loading()
      API.callRequest('/mindray/po/findAll', form).then(({data}) => {
        this.tableData = data.dataList
        this.pager.total = data.total
      }).finally(() => {
        loading && loading.close()
      })
    },
    editForm(selectData) {
      let form = new FormData()
      form.append('oid', selectData[0].oid)
      this.formConfig = this.config.modules.form2
      API.callRequest('/mindray/po/findByOid', form).then(({data}) => {
        console.log('编辑获取表单信息----', data)
        this.dialogVisible = true
        this.formData = data
      })
    },
    handleShowGragh(scope) {
      this.graphData = scope.row
      this.visibleGraph = true
    },
    handleFormUpliadFile(fileRaw) {
      this.formAttach = fileRaw
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      let form = new FormData()
      for(let prop in this.formData) {
        form.append(prop, this.formData[prop])
      }
      if (!!this.formAttach) {
        form.append('file', this.formAttach)
      }
      let loading = this.$loading()
      if (this.btnName === 'add') {
        API.callRequest('/mindray/po/save', form).then(({data}) => {
          loading.close()
          if (data.status) {
            this.getTableData()
          } else {
            Utils.messageBox(this, data.message || '保存失败！')
          }
        })
      }
      if (this.btnName === 'edit') {
        API.callRequest('/mindray/po/update', form).then(({data}) => {
          loading.close()
          if (data.status) {
            this.getTableData()
          } else {
            Utils.messageBox(this, data.message || '保存失败！')
          }
        })
      }
      this.dialogVisible = false
      this.formData = {}
      this.formAttach = null
    },
    handleClose(done) {
      done()
    },
    handleSizeChange(selectData) {
    },
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