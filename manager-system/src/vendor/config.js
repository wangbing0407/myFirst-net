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
