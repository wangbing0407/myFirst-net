// select 静态配置
let config = {
  selectYN: [
    {
      CNLabel: 'Y',
      ENLabel: 'Y',
      key: 'Y',
    },
    {
      CNLabel: 'N',
      ENLabel: 'N',
      key: 'N',
    },
  ],
  // 集成方向
  integrationDirection: [
    {
      CNLabel: '->',
      ENLabel: '->',
      key: 'from',
    },
    {
      CNLabel: '<-',
      ENLabel: '<-',
      key: 'to',
    },
  ],
  // 所属系统
  belongToSystem: [
    {
      CNLabel: 'PLM',
      ENLabel: 'PLM',
      key: 'PLM',
    },
    {
      CNLabel: 'PBI',
      ENLabel: 'PBI',
      key: 'PBI',
    },
    {
      CNLabel: 'IDP',
      ENLabel: 'IDP',
      key: 'IDP',
    },
    {
      CNLabel: 'ERP',
      ENLabel: 'ERP',
      key: 'ERP',
    },
  ],
  // 涉及系统-上游
  involvingSystemUpper: [
    {
      CNLabel: 'PLM',
      ENLabel: 'PLM',
      key: 'PLM',
    },
    {
      CNLabel: 'PBI',
      ENLabel: 'PBI',
      key: 'PBI',
    },
    {
      CNLabel: 'IDP',
      ENLabel: 'IDP',
      key: 'IDP',
    },
    {
      CNLabel: 'ERP',
      ENLabel: 'ERP',
      key: 'ERP',
    },
  ],
  // 涉及系统-下游
  involvingSystemDown: [
    {
      CNLabel: 'PLM',
      ENLabel: 'PLM',
      key: 'PLM',
    },
    {
      CNLabel: 'PBI',
      ENLabel: 'PBI',
      key: 'PBI',
    },
    {
      CNLabel: 'IDP',
      ENLabel: 'IDP',
      key: 'IDP',
    },
    {
      CNLabel: 'ERP',
      ENLabel: 'ERP',
      key: 'ERP',
    },
  ],
}
let setConfig = function (object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (key !== 'thingTemplate') {
        let keys = object[key]
        let result = []
        keys.map((k) => {
          result.push({
            CNLabel: k.zh_CN,
            ENLabel: k.en_US,
            key: k.key,
          })
        })
        config[key] = result
      } else {
        config[key] = key
      }
    }
  }
  console.log('全局下拉值配置', config)
}
export { config, setConfig }
