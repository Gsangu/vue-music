import jsonp from 'common/js/jsonp'
import {commonParams, options} from "./config"
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    cid: '205360410',
    reqtype: 1,
    from: 2,
    ct: 24,
    qq: 0,
    tpl: 'v12',
    page: 'other'
  })
  return jsonp(url, data, options)
}

export function getSongList(id) {
  const url = 'https://api.gsanweb.cn/music?source=tencent&types=playlist&id='+id

  return axios.get(url,{}).then((res) => {
    let data = res.data;
    if(!data instanceof Object){
      data = JSON.parse(data.replace("jsonCallback(","").substr(0,data.length-1))
    }
    return Promise.resolve(data)
  })
}
