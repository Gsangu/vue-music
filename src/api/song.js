import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from "./config"
import axios from 'axios'

export function getLyric(mid) {
  const url = `https://api.gsanweb.cn/music`

  const data = Object.assign({}, commonParams, {
    id: mid,
    source: 'tencent',
    types: 'lyric'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getUrl(mid) {
  // const url = `https://api.gsanweb.cn/music`

  // const data = Object.assign({}, commonParams, {
  //   id: mid,
  //   source: 'tencent',
  //   types: 'url'
  // })

  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })

  var url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
  var params = {
    data: {
      req_0: {
        module: "vkey.GetVkeyServer", // 管他什么写死就好了
        method: "CgiGetVkey", // 管他什么写死就好了
        param: {
          guid: "5339940689", // 管他什么写死就好了
          songmid: [mid], // 歌曲的mid
          songtype: [0], // 管他什么写死就好了,
          uin: "", // 用户的qq号，传不传无所谓
          platform: "20" // 管他什么写死就好了
        }
      }
    }
  }
  params.data = JSON.stringify(params.data);

  params.jsonpCallback = 'GET_QQ_VKEY';
  params.callback = 'GET_QQ_VKEY';
  const data = Object.assign({}, commonParams, params);
  const option = Object.assign({}, options, {
    name: 'GET_QQ_VKEY'
  });
  // 这里要转成字符串
  return jsonp(url, data, option).then((res) => {
    const {
      guid,
      vkey
    } = getQueryFromUrl(null, res.req_0.data.midurlinfo[0].purl);
    if (!guid) {
      return Promise.reject({
        message: '播放错误'
      })
    }
    const murl = res.req_0.data.sip[1] || res.req_0.data.sip[0];
    const s = 'M500';
    const e = '.mp3';
    return Promise.resolve({
      url: `${murl}${s}${mid}${e}?guid=${guid}&vkey=${vkey}&fromtag=8&uin=0`
    })
  })


}

function getQueryFromUrl(key, search = window.location.hash) {
  try {
    const sArr = search.split('?');
    let s = '';
    if (sArr.length > 1) {
      s = sArr[1];
    } else {
      return key ? undefined : {};
    }
    const querys = s.split('&');
    const result = {};
    querys.forEach((item) => {
      const temp = item.split('=');
      result[temp[0]] = decodeURI(temp[1]);
    });
    return key ? result[key] : result;
  } catch (err) {
    // 除去search为空等异常
    console.log(err);
    return key ? '' : {};
  }
}
