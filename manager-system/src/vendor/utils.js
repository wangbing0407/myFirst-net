// 数组去重
export function unique(data) {
  return Array.from(new Set(data))
}
// 时间格式化
export function formatTime(data) {
  const year = new Date(data).getFullYear()
  const month = new Date(data).getMonth() + 1
  const day = new Date(data).getUTCDate()
  const hours = new Date(data).getHours()
  const minutes = new Date(data).getMinutes()
  return `${year}/${month}/${day} ${hours}:${minutes}`
}
// 全局messageBox
export function messageBox(_this, options, callback) {
  let msg = ''
  let title = '提示' // 提示
  if (options && typeof options === 'object') {
    title = options.title || title
    msg =
      options.msg ||
      (options.isSuccess || options.success
        ? '成功！'
        : options.errorMessage || options.message || '失败！')
  } else {
    msg = options || ''
  }
  msg = msg ? msg.replace(/(\r\n)|(\n)|(\r)/g, '<br>') : '' // 特殊字符处理
  _this.$alert(msg, title, {
    confirmButtonText: '确定', // 确定
    dangerouslyUseHTMLString: true,
    callback: (action) => {
      callback && callback()
    },
  })
}

/**
 * 下载附件（此种方式解决window.open方式下载会闪烁的问题，以及图片下载会直接打开的问题）
 * @param {Object} config 配置信息，config.src必填
 * @param {Boolean} isIntercept 附件名称是否通过截取src最后一个‘/’或‘\\’后面的文字，config.fileName为空时生效
 */
export function downloadFile(config, isIntercept) {
  const a = document.createElement('a')
  a.href = config.src
  if (config.target) {
    a.target = config.target
  }
  let fileName = config.fileName
  if (!fileName && !!isIntercept) {
    let arr = config.src.split(/[\/\\\\]/).reverse() // 多个分隔符‘/’、‘\\’
    fileName = arr[0]
  }
  a.download = fileName // download方式可以给附件命名，但是有兼容性问题：谷歌、microsoft Edge、火狐浏览器支持，IE不支持
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function download(url, timeout = 1000) {
  let elemIF = document.createElement("iframe");
  elemIF.src = encodeUrl(url);
  elemIF.style.display = "none";
  document.body.appendChild(elemIF);
  setTimeout(() => {
    elemIF.remove()
  }, timeout);
}
