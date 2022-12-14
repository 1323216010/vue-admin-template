import request from '@/utils/request'

export function deletByName(name) {
    return request({
        url: `/files/delete/${name}`,
        method: 'get'
    })
}

export function queryByLimit(offset,limit) {
    return request({
        url: `/files/${offset}/${limit}`,
        method: 'get'
    })
}

export function queryAll(data) {
    return request({
        url: `/files/list`,
        method: 'post',
        data
    })
}