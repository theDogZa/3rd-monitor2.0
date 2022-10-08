import axios from 'axios'
import socketIoClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

const ioClient = sailsIOClient(socketIoClient)
export default {
  socketIo: ioClient,
  axios: axios
}
