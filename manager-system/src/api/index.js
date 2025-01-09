import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Home',
    method: 'post',
    data,
  })
}

export function exportData(data) {
  return request({
    url: 'http://localhost:8989/po/exportPOInfo',
    method: 'post',
    data,
    responseType: 'blob',  // 注意需要加blob
  });
}

export function callRequest(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
  })
}
