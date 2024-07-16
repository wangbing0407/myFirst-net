<template>
  <div class="detail-table">
    <!-- 动态表格按钮 -->
    <div class="buttons">
      <div>
        <el-upload v-if="props.buttons && props.buttons.includes('addFile')" ref="upload" :action="props.filePath"
          :auto-upload="false" :limit="props.limit" :on-change="handleChange" :file-list="fileList"
          :show-file-list="false">
          <el-button slot="trigger" type="primary" icon="el-icon-plus">附件上传</el-button>
        </el-upload>
        <el-button v-if="props.buttons && props.buttons.includes('add')" size="small" type="primary" icon="el-icon-plus"
          @click="handleAdd">新增</el-button>
        <el-button v-if="props.buttons && props.buttons.includes('edit')" size="small" icon="el-icon-edit" @click="handleEdit">
          编辑</el-button>
        <el-button v-if="props.buttons && props.buttons.includes('revise')" size="small" icon="el-icon-edit" @click="handleRevise">
          重置</el-button>
        <el-button v-if="props.buttons && props.buttons.includes('copy')" size="small" icon="el-icon-search" @click="handleCopy">
          复制</el-button>
        <el-button v-if="props.buttons && props.buttons.includes('search')" size="small" icon="el-icon-search" @click="handleSearch">
          搜索</el-button>
        <el-button v-if="props.buttons && props.buttons.includes('delete')" size="small" icon="el-icon-delete" @click="handleDelete">
          删除</el-button>

        <div class="import-box" v-if="props.buttons && props.buttons.includes('import')">
          <i class="el-icon-upload2"></i>
          导入
          <input type="file" ref="fileF" @change="handleImport" class="btn-import">
        </div>
        <el-button v-if="props.buttons && props.buttons.includes('export')" size="small" icon="el-icon-download" @click="handleExport">
          导出</el-button>
        <!-- 导入需要的模板链接 -->
        <el-link v-if="props.buttons && props.buttons.includes('importTemplate')" :href="props.buttonsImportTemplateHref" target="_blank" 
          type="primary" style="margin-right: 10px;">下载模板</el-link>
          <!-- 插槽 -->
        <slot name="buttons" :props="props"></slot>
      </div>
      <slot name="customRightBtn" :props="props"></slot>
    </div>
    <!-- 树形Table -->
    <el-table v-if="props.type === 'tree'" size="mini" stripe highlight-current-row :expand-on-click-node="false"
      ref="tree" :data="data" style="width: 100%" row-key="oid"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" lazy :load="load" @row-click="handleRowClick">
      <el-table-column v-for="item in props.columns" v-if="item.type === 'selection'" :key="item.id"
        header-align="center" align="center" :prop="item.prop" :label="item.label" :width="item.width" />
      <el-table-column header-align="center" align="center" v-else :prop="item.prop" :label="item.label"
        :width="item.width">
        <template slot-scope="scope">
          <a v-if="item.type == 'link'" href="javascript:void(0)"
            @click="handleJump(scope)">{{scope.row[item.prop]}}</a>
          <span
            v-else-if="item.type === 'select' || item.type === 'format'">{{ getOptionsByType(scope.row[item.prop],item.prop) }}</span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格Table -->
    <el-table v-else size="mini" :data="data" stripe style="width: 100%" @selection-change="handleSelectionChange"
      ref="table">
      <el-table-column v-for="item in props.columns" :key="item.id" v-if="item.type === 'selection'"
        :type="item.type == 'selection'?'selection':''" header-align="center" align="center" :prop="item.prop"
        :label="item.label" :width="item.width" />
      <el-table-column header-align="center" v-else :show-overflow-tooltip="!!item.showOverflow" align="center" :prop="item.prop" :label="item.label"
        :width="item.width">
        <template slot-scope="scope" v-if="item.type !== 'selection'">
          <a v-if="item.type == 'link'" href="javascript:void(0)"
            @click="handleJump(scope)">{{scope.row[item.prop]}}</a>
          <span
            v-else-if="item.type === 'select' || item.type === 'format'">{{ getOptionsByType(scope.row[item.prop],item.prop) }}</span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <div v-if="pager && data.length > 0 && props.type !== 'tree'">
      <el-pagination background :current-page="pager.offset" :page-sizes="pager.pageSizes" :page-size="pager.range"
        layout="total, sizes, prev, pager, next" :total="pager.total" @size-change="handleSizeChange"
        @current-change="handlePagerChange" />
    </div>
  </div>
</template>

<script>
import * as Utils from '@/vendor/utils'
import * as Config from '@/vendor/config'
export default {
  name: 'Table',
  components: {},
  props: {
    props: {
      type: Object,
      default: function () {
        return {}
      },
    },
    data: {
      type: Array,
      default: function () {
        return []
      },
    },
    pager: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      fileList: [],
      file: {},
      currentSelect: [],
      Utils: Utils,
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.file = file
      this.fileList = []
      if (this.file.raw) this.file.raw.time = Utils.formatTime(new Date())
      this.$emit('handleAddFile')
    },
    handleSelectionChange(e) {
      this.currentSelect = e
      this.$emit('selection-change', e)
    },
    handleAddFile(e) {},
    handleEdit(e) {
      this.$emit('handleEdit', this.currentSelect)
      this.$emit('handleBtnEmit', 'edit', this.currentSelect)
    },
    handleDelete(e) {
      this.$emit('handleDelete', this.currentSelect)
      this.$emit('handleBtnEmit', 'delete', this.currentSelect)
    },
    handleSearch() {
      this.$emit('handleSearch', this.currentSelect)
    },
    handleClean() {
      this.$emit('handleClean', this.currentSelect)
    },
    handleAdd() {
      this.$emit('handleAdd', this.currentSelect)
      this.$emit('handleBtnEmit', 'add', this.currentSelect)
    },
    handleAddObject() {
      this.$emit('handleAddObject', this.currentSelect)
    },
    handleCopy() {
      this.$emit('handleCopy', this.currentSelect)
    },
    handleRevise() {
      this.$emit('handleRevise', this.currentSelect)
    },
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e)
    },
    handlePagerChange(e) {
      this.$emit('handlePagerChange', e)
    },
    handleRowClick(e) {
      this.$emit('handleRowClick', e)
    },
    handleJump(e) {
      this.$emit('handleJump', e)
    },
    handleImport(event) {
      this.$emit('handleImport', event)
    },
    handleExport() {
      this.$emit('handleExport', this.currentSelect)
      this.$emit('handleBtnEmit', 'export', this.currentSelect)
    },
    getOptionsByType(key, type) {
      const data = Config.config[type]
        ? Config.config[type].find((r) => r.key === key)
        : null
      return data ? data['CNLabel'] : key
    },
  },
}
</script>

<style scoped lang="scss">
.detail-table {
  width: 100%;
  overflow-x: hidden;
  .el-table {
    // margin: 10px 0;
  }
  .buttons {
    display: flex;
    padding-bottom: 16px;
  }
  .el-button {
    margin-right: 10px;
  }
  .el-pagination {
    padding: 12px 5px;
  }
  a {
    color: #337ab7;
    // text-decoration: underline;
  }
  .import-box {
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    margin-right: 20px;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    input {
      overflow: hidden !important;
    }
    .btn-import {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    &:hover {
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
</style>

