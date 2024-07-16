<template>
  <div class="detail-information">
    <el-form :label-width="props.labelWidth" :model="data" :rules="rules" ref="form" :label-position="props.labelPosition ? props.labelPosition : 'left'">
      <el-row :gutter="(props.gutter || props.gutter === 0) ? props.gutter : 20" :class="{'flex-info':props.flexInfo}">
        <el-col v-for="col in props.columns" :key="col.label" :span="col.span">
          <el-form-item :label="`${col.label}：`" :prop="col.prop" :label-width="col.labelWidth">
            <el-input v-if="col.type === 'input' &&  col.edit" v-model="data[col.prop]" size="mini"
              :disabled="col.disable" placeholder="请输入内容"></el-input>
            <el-select v-else-if="col.type === 'select' && col.edit" size="mini" clearable v-model="data[col.prop]"
              placeholder="请选择" :disabled="col.disable">
              <el-option v-for="item in getOptions(col)" :key="item.key" :label="item.CNLabel" :value="item.key">
              </el-option>
            </el-select>
            <div class="block" v-else-if="col.type === 'cascader'  &&  col.edit">
              <el-cascader :props="obj" clearable v-model="data[col.prop]" :placeholder="data.fjDisplay" :disabled="col.disable" :class="{'process-cascaders':data.fjDisplay}"></el-cascader>
            </div>
            <div v-else-if="col.type === 'select' || col.type === 'format'">
              {{ getOptionsByType(data[col.prop],col.prop) }}</div>
            <div v-else
              v-html="col.prop === 'versionInfo' ?`${data[col.prop]}.${data['iterationInfo']}`:data[col.prop]">
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import * as Config from '@/vendor/config'
export default {
  name: 'Information',
  components: {
  },
  props: {
    props: {
      type: Object,
      default: function () {
        return {}
      },
    },
    data: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      selectYN: [],
      rules: {},
      obj: {},
    }
  },
  created() {
    this.setRequired()
  },
  mounted() {
    this.setRequired()
  },
  beforeUpdate() {
    this.setRequired()
  },
  methods: {
    // 设置必填
    setRequired() {
      if (!this.props.columns) return
      this.props.columns.map((r) => {
        const obj = {
          message: '必填项',
          trigger: 'blur',
          required: r.required,
        }
        const max = {
          min: 1,
          max: r.max,
          message: `最大${r.max}个字符长度`,
          trigger: 'blur',
        }
        if (r.type === 'select') obj.trigger = 'change'
        if (r.max) {
          this.rules[r.prop] = [obj, max]
        } else {
          this.rules[r.prop] = [obj]
        }
      })
    },
    // 获取静态配置
    getOptions(col) {
      if (this.selectYN.includes(col.prop)) {
        return Config.config.selectYN
      } else {
        return Config.config[col.prop]
      }
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

<style lang="scss">
.detail-information {
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item__label {
    font-weight: bold;
  }
  .el-cascader {
    width: 96%;
  }
  .process-cascaders{
    input.el-input__inner::-webkit-input-placeholder {
      color: #606266;
    }
    input.el-input__inner::-moz-placeholder {
      color: #606266;
    }
    input.el-input__inner:-ms-input-placeholder {
      color: #606266;
    }
  }
  .flex-info{
    display: flex;
    flex-flow: wrap;
  }
}
</style>
<style>
.detail-information .el-form {
  padding: 0px 40px !important;
}
</style>

