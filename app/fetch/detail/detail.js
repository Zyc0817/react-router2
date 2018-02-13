import { get } from '../get'

export function getInfoData(id) {
    const result = get('/api/detail/info/' + id)
    return result
}

export function getDetailData(page, id) {
    const result = get('/api/detail/comment/' + page + '/' + id)
    return result
}



