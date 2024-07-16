const defaultAttribute = {
  span: 12,
  width: 100,
  disable: false,
  type: 'text',
  labelWidth: '120px',
  value: '',
  required: false,
}
const columns = [
  {
    label: '全选',
    prop: 'selection',
  },
  {
    label: '目录层级位置',
    prop: 'directoryLevelLocation',
  },
  {
    label: '接口名称',
    prop: 'interfaceName',
  },
  {
    label: 'PO接口地址',
    prop: 'poInterfaceAddress',
  },
  {
    label: '所属系统',
    prop: 'affiliationSystem',
  },
  {
    label: '所属模块',
    prop: 'affiliationModule',
  },
  {
    label: '接口描述',
    prop: 'interfaceDescription',
  },
  {
    label: '集成方向',
    prop: 'integrationDirection',
  },
  {
    label: '涉及系统',
    prop: 'involvingSystems',
  },
  {
    label: '关联项目',
    prop: 'associatedProjects',
  },
  {
    label: '对接人',
    prop: 'contactPerson',
  },
  {
    label: '接口附件',
    prop: 'interfaceAttachments',
  },
  {
    label: '系统版本',
    prop: 'systemVersion',
  },
  {
    label: '创建人',
    prop: 'creator',
  },
  {
    label: '创建时间',
    prop: 'createTimestamp',
  },
  {
    label: '修改人',
    prop: 'modifier',
  },
  {
    label: '修改时间',
    prop: 'modifyTimestamp',
  },
  {
    label: '修改原因',
    prop: 'modificationReason',
  },
]
/**
 * @description:动态匹配column
 * @param {label} 匹配名称
 * @param {span} 布局占比
 * @param {width} 表格长度
 * @param {disable} 是否能编辑
 * @param {type} 文本类型
 * @param {required} 是否必填
 * @param {edit} 能否编辑
 * @param {max} 最大字符长度
 * @param {showOverflow} table中内容超出是否显示省略号并提示tip
 * @return: column
 */
export default function ({
  label,
  span,
  width,
  disable,
  type,
  required,
  edit = true,
  hide = false,
  max,
  showOverflow = true, // table中内容超出是否显示省略号并提示tip
}) {
  let column = Object.assign(
    {},
    columns.find((c) => c.label === label)
  )
  column = Object.assign({}, defaultAttribute, column)
  column.label = column.label
  column.prop = column.prop
  if (column.prop_name || column.name) column.label = column.prop_name
  column.span = span || column.span
  column.width = width || column.width
  column.disable = disable || column.disable
  column.type = type || column.type
  column.required = required || column.required
  column.edit = edit || column.edit
  column.max = max || column.max
  column.hide = hide || column.hide
  column.showOverflow = showOverflow || column.showOverflow
  return column || {}
}
