import request from '@/utils/request';
// 'POST' 请使用 `data` 字段
// 'GET' 请使用 `params` 字段
// axios 使用指南：https://axios-http.com/zh/docs/req_config
export function CoredumpAllExcel() {
    return request({
        url: '/coredump/allexcel',
        method: 'get',
        responseType: 'blob', // 重要：指定响应类型为二进制流
    })
}
export function CoredumpFdsUrl(id) {
    return request({
        url: '/coredump/fdsurl',
        method: 'post',
        data: { id }
    })
}

export function CoreDumpList(query) {
    return request({
        url: '/coredump/list',
        method: 'post',
        data: {
            page: query.page,  // 分页的页数
            limit: query.limit,  // 每页的数量
            name: query.name, // 文件名称的模糊搜索
            product: query.product, // 产品型号
            version: query.version, // mcu 版本
            timDesc: query.timdesc,  // 时间字段降序排序（暂时为 true)
            verDesc: query.verdesc, // mcu版本字段降序排序（暂时为 true)
        }
    });
}
export function CoredumpMiInfo(id) {
    return request({
        url: '/coredump/miinfo',
        method: 'post',
        data: { id },
        responseType: 'blob', // 重要：指定响应类型为二进制流
    })
}

