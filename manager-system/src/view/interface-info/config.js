import getColumn from '@/vendor/column'

export default {
  modules: {
    form: {
      labelWidth: '160',
      labelPosition: 'left',
      columns: [
        getColumn({ label: '接口名称', type: 'input', span: 12}), // 编辑时不能填
        getColumn({ label: 'PO接口地址', type: 'input', span: 12}),// 编辑时不能填
        getColumn({ label: '所属系统', type: 'select', span: 12, placeholder: ''}),// 编辑时不能填
        getColumn({ label: '所属模块', type: 'select', span: 12, placeholder: '比如：用服、变式'}),// 编辑时不能填 
        getColumn({ label: '接口描述', type: 'input', span: 12, placeholder: '概括接口的核心功能'}),
        getColumn({ label: '关联项目', type: 'input', span: 12, placeholder: '比如：用服项目新增接口'}),
        getColumn({ label: '对接人', type: 'input', span: 12,  placeholder: '比如：袁涛 50262180'}),
        // getColumn({ label: '系统版本', type: '', span: 12}),
        // getColumn({ label: '创建人', type: '', span: 12}),
        // getColumn({ label: '创建时间', type: '', span: 12}),
        // getColumn({ label: '修改人', type: '', span: 12}),
        // getColumn({ label: '修改时间', type: '', span: 12}),
        getColumn({ label: '修改原因', type: 'textarea', span: 24}),
        getColumn({ label: '涉及系统-上游', type: 'select', span: 8}),
        getColumn({ label: '集成方向', type: 'select', span: 8}),
        getColumn({ label: '涉及系统-下游', type: 'select', span: 8}),
        getColumn({ label: '接口附件', type: 'upload', span: 24}),
      ],
    },
    form2: {
      labelWidth: '160',
      labelPosition: 'left',
      columns: [
        getColumn({ label: '接口名称', type: '', span: 12}), // 编辑时不能填
        getColumn({ label: 'PO接口地址', type: '', span: 12}),// 编辑时不能填
        getColumn({ label: '所属系统', type: '', span: 12}),// 编辑时不能填
        getColumn({ label: '所属模块', type: '', span: 12, placeholder: '比如：用服、变式'}),// 编辑时不能填 
        getColumn({ label: '系统版本', type: '', span: 12}),
        getColumn({ label: '创建人', type: '', span: 12}),
        getColumn({ label: '创建时间', type: '', span: 12}),
        getColumn({ label: '修改人', type: '', span: 12}),
        getColumn({ label: '修改时间', type: '', span: 12}),
        getColumn({ label: '接口描述', type: 'input', span: 12, placeholder: '概括接口的核心功能'}),
        getColumn({ label: '关联项目', type: 'input', span: 12, placeholder: '比如：用服项目新增接口'}),
        getColumn({ label: '对接人', type: 'input', span: 12,  placeholder: '比如：袁涛 50262180'}),
        getColumn({ label: '修改原因', type: 'textarea', span: 24}),
        getColumn({ label: '涉及系统-上游', type: 'select', span: 8}),
        getColumn({ label: '集成方向', type: 'select', span: 8}),
        getColumn({ label: '涉及系统-下游', type: 'select', span: 8}),
        getColumn({ label: '接口附件', type: 'upload', span: 24}),
      ],
    },
    table: {
      columns: [
        getColumn({ label: '全选', type: 'selection', width: 60 }),
        getColumn({ label: '接口名称', type: '' }),
        getColumn({ label: 'PO接口地址', type: '' }),
        getColumn({ label: '所属系统', type: '' }),
        getColumn({ label: '所属模块', type: '' }),
        getColumn({ label: '接口描述', type: '' }),
        getColumn({ label: '集成方向', type: 'showIcon', width: 150 }),
        getColumn({ label: '涉及系统', type: '' }),
        getColumn({ label: '关联项目', type: '' }),
        getColumn({ label: '对接人', type: '' }),
        getColumn({ label: '接口附件', type: '' }),
        getColumn({ label: '系统版本', type: '' }),
        getColumn({ label: '创建人', type: '' }),
        getColumn({ label: '创建时间', type: '' }),
        getColumn({ label: '修改人', type: '' }),
        getColumn({ label: '修改时间', type: '' }),
        getColumn({ label: '修改原因', type: '' }),
      ],
      buttons: ['add', 'edit', 'delete', 'import', 'export']
    },
  },
  formSelect: {
    PLM: [
      {
        zh_CN: '变更',
        en_US: '变更',
        key: 'EC'
      },
      {
        zh_CN: '部件',
        en_US: '部件',
        key: 'Part'
      },
      {
        zh_CN: '文档',
        en_US: '文档',
        key: 'Doc'
      }
    ],
    PBI: [
      {
        zh_CN: '总部PBI',
        en_US: '总部PBI',
        key: 'PBI'
      },
      {
        zh_CN: '武汉PBI',
        en_US: '武汉PBI',
        key: 'WHPBI'
      },
    ]
  },
  mockData: [
    {
      interfaceName: '产品目录树推送接口xxxxsyncOptionProduct',
      poInterfaceAddress: '',
      affiliationSystem: 'PBI',
      affiliationModule: '产品目录树',
      interfaceDescription: '推送PBIL1-L7的目录结构',
      integrationDirection: 'PBI->ERP',
      involvingSystems: 'ERP',
      associatedProjects: 'PBI一期优化、PBI集成管理',
      contactPerson: '袁涛',
      interfaceAttachments: '',
      systemVersion: 'A.1',
      creator: '袁涛',
      createTimestamp: '2024-04-11',
      modifier: '袁涛',
      modifyTimestamp: '2024-04-22',
      modificationReason: 'PBI一期优化项目需要修改接口的字段',
    },
    {
      interfaceName: '产品目录树推送接口xxxxsyncOptionProduct',
      poInterfaceAddress: '',
      affiliationSystem: 'WHPBI',
      affiliationModule: '法规信息',
      interfaceDescription: '推送PBIL1-L7的目录结构',
      integrationDirection: 'WHPBI->ERP',
      involvingSystems: 'ERP',
      associatedProjects: 'PBI一期优化、PBI集成管理',
      contactPerson: '袁涛',
      interfaceAttachments: '',
      systemVersion: 'A.1',
      creator: '袁涛',
      createTimestamp: '2024-04-11',
      modifier: '袁涛',
      modifyTimestamp: '2024-04-22',
      modificationReason: 'PBI一期优化项目需要修改接口的字段',
    }
  ]
}
