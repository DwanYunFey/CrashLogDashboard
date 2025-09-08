import request from '@/utils/request';
// 'POST' 请使用 `data` 字段
// 'GET' 请使用 `params` 字段
// axios 使用指南：https://axios-http.com/zh/docs/req_config
export function RenewURL(url) {
    return request({
        method: 'post',
        url: '/presigned/renewurl',
        data: {
            url
        }
    });
}