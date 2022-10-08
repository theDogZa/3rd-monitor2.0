import mainServer from './mainService'
import apiUrl from '../assets/config/api.url.json'

const IoClient = mainServer.socketIo
// --- change exApi to connect more api
const exApi = apiUrl.api.queue
const api = {
  url: exApi.url,
  useCORSRouteToGetCookie: false,
  reconnectionAttempts: 1000,
  autoConnect: true,
  reconnection: true
}

const io = IoClient.sails.connect(api)

export default {
  async get () {
    let d = new Promise((resolve, reject) => {
      io.get(exApi.pathGet, { limit: 1000 }, async function (data, JWR) {
        resolve(data)
      })
    })
    return d
  },
  // async on () {
  //   const _this = this
  //   let d = new Promise((resolve, reject) => {
  //     io.on(exApi.pathOn, async function (data) {
  //       _this.isOnConnect = true
  //       resolve(data)
  //     })
  //   })
  //   return d
  // },
  async on () {
    let d = new Promise((resolve, reject) => {
      io.on(exApi.pathOn, async function (data) {
        resolve(data)
      })
    })
    return d
  },
  // async on () {
  //   const _this = this
  //   console.log(this.isOnConnect)
  //   if (this.isOnConnect === false) {
  //     let d = new Promise((resolve, reject) => {
  //       io.on(exApi.pathOn, async function (data) {
  //         _this.isOnConnect = true
  //         _this.data = d
  //         resolve(data)
  //       })
  //     })
  //   }
  //   return this.data
  // },
  connect: io,
  pathOn: exApi.pathOn,
  data: {},
  isOnConnect: false
}
