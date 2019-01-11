import {
  getLyric,
  getUrl
} from 'api/song'
import {
  ERR_OK
} from 'api/config'
import {
  Base64
} from 'js-base64'

export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.lyric) {
          this.lyric = res.lyric
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }

  getUrl() {
    if (this.url) {
      return Promise.resolve(this.url)
    }

    return new Promise((resolve, reject) => {
      getUrl(this.mid).then((res) => {
        if (res.url) {
          this.url = res.url
          resolve(this.url)
        } else {
          reject('error')
        }
      })
    })
  }
}

export function createSong(musicData) {
  const album = musicData.hasOwnProperty('albumname') ? musicData.albumname : musicData.album.name;
  return new Song({
    id: musicData.songid || musicData.id,
    mid: musicData.songmid || musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname || musicData.name,
    album,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid || musicData.album.mid}.jpg?max_age=2592000`
  })
  // return new Song({
  //     id: musicData.id,
  //     mid: musicData.mid,
  //     singer: filterSinger(musicData.singer),
  //     name: musicData.name,
  //     album: musicData.albumname || musicData.album.name,
  //     duration: musicData.interval,
  //     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid ||musicData.album.mid}.jpg?max_age=2592000`,
  //     url: `http://dl.stream.qqmusic.qq.com/C400${musicData.file.media_mid}.m4a?guid=1152292416&vkey=031770AB97A339220DB4FFBBA78C9656176F05990615A9F60B5FEA2EA09CFA028CC5676CEE3E320F3467DAB9876355D1AAC4E27463E71A10&uin=0&fromtag=38`
  // })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
