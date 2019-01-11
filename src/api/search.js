import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const data = {
    p: page,
    n: perpage,
    w: query,
    cr: 1,
    aggr: 1
  }
  // const data = Object.assign({}, {commonParams}, {
  //   callback: 'MusicJsonCallback',
  //   jsonpCallback: 'MusicJsonCallback',
  //   w: query,
  //   p: page,
  //   perpage,
  //   n: perpage,
  //   catZhida: zhida ? 1 : 0,
  //   zhidaqu: 1,
  //   t: 0,
  //   flag: 1,
  //   ie: 'utf-8',
  //   sem: 1,
  //   aggr: 0,
  //   remoteplace: 'txt.mqq.all',
  //   uin: 0,
  //   needNewCode: 1
  // })

  return jsonp(url, data, options)
}
