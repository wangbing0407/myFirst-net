import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Home',
    method: 'post',
    data,
  })
}

export function callRequest(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
  })
}
