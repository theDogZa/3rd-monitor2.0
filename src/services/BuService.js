import mainServer from './mainService'
import apiUrl from '../assets/config/api.url.json'

const axios = mainServer.axios
// --- change exApi to connect more api
const exApi = apiUrl.api.BuJson
const api = {
  url: exApi.url + exApi.pathGet
}

export default {
  async get () {
    let d = new Promise((resolve, reject) => {
      axios.get(api.url)
        .then(response => {
          console.log()
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    })
    return d
  }
//   },
//   async on () {
//     let d = new Promise((resolve, reject) => {
//       io.on(exApi.pathOn, async function (data) {
//         resolve(data)
//       })
//     })
//     return d
//   },
//   connect: io,
//   pathOn: exApi.pathOn
}
