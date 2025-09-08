import request from '@/utils/request';
// 'POST' 请使用 `data` 字段
// 'GET' 请使用 `params` 字段
// axios 使用指南：https://axios-http.com/zh/docs/req_config
export function Login() {
  return request({
    url: '/user/login',
    method: 'get'
  });
}

export function UserInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: {
      token
    }
  });
}

export function Logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: {
      token
    }
  });
}
