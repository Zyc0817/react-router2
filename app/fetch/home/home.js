import { get } from '../get'

export function getAdData() {
    const result = get('/api/homead')
    return result
}

export function getListData(city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
    return result
}

export function getSearchData(city, page, keyword, type) {
    const result = get('/api/searchlist/' + encodeURIComponent(city) + '/' + page + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(keyword))
    return result
}


