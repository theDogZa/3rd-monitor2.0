// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { BootstrapVue, LayoutPlugin, ModalPlugin, CardPlugin, VBScrollspyPlugin, DropdownPlugin, TablePlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material-design-icons/styles.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// lang for app
import lang from './assets/config/lang.en.json'

import queueService from './services/QueueService'
import extensionService from './services/ExtensionService'
import channelService from './services/ChannelService'
import BuService from './services/BuService'
import instatQueueService from './services/InstatQueueService'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(CardPlugin)
Vue.use(VBScrollspyPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data () {
    return {
      language: lang,
      menuKey: '',
      d_a_isConnectApi: [],
      d_a_isUseApi: [],
      d_a_chkCallApl: [],
      d_a_chkGetApl: [],
      paramBuCode: '',
      d_a_buExtension: [],
      d_a_buQueue: [],
      d_a_buInstatqueue: [],
      d_a_buJson: []
    }
  },
  created () {
    this.getAllConfig()
    this.checkConnected()

    this.d_a_isUseApi['extension'] = false
    this.d_a_isUseApi['queue'] = false
    this.d_a_isUseApi['instatqueue'] = false
    this.d_a_isUseApi['channel'] = false
  },
  mounted () {
    setInterval(this.checkConnected, 1000)
  },
  updated () {
  },
  methods: {
    chkConnectApi (m) {
      if (m === 'offeredCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'waitingCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'answeredCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'abandonedCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'perAbandonedCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'AgentReadyInQueue') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
      } else if (m === 'AgentInUsed') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
      } else if (m === 'AgentOnHold') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
      } else if (m === 'AgentPaused') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
      } else if (m === 'MissedCalls') {
        this.d_a_isUseApi['instatqueue'] = true
        this.d_a_chkGetApl['instatqueue'] = false
        this.d_a_isConnectApi['instatqueue'] = false
      } else if (m === 'AvgTalkTime') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'HandleCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'OfferedCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'WaitingCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'AnsweredCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'AbandonedCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'PerAbandonedCalls') {
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
      } else if (m === 'navBar') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
      } else if (m === 'inboundChannel') {
        this.d_a_isUseApi['channel'] = true
        this.d_a_chkGetApl['channel'] = false
        this.d_a_isConnectApi['channel'] = false
      } else if (m === 'inboundQueue') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
        this.d_a_isUseApi['instatqueue'] = true
        this.d_a_chkGetApl['instatqueue'] = false
        this.d_a_isConnectApi['instatqueue'] = false
      } else if (m === 'inboundAgent') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
        this.d_a_isUseApi['instatqueue'] = true
        this.d_a_chkGetApl['instatqueue'] = false
        this.d_a_isConnectApi['instatqueue'] = false
      } else if (m === 'tempWidget') {
        this.d_a_isUseApi['extension'] = true
        this.d_a_chkGetApl['extension'] = false
        this.d_a_isConnectApi['extension'] = false
        this.d_a_isUseApi['queue'] = true
        this.d_a_chkGetApl['queue'] = false
        this.d_a_isConnectApi['queue'] = false
        this.d_a_isUseApi['instatqueue'] = true
        this.d_a_chkGetApl['instatqueue'] = false
        this.d_a_isConnectApi['instatqueue'] = false
      }
    },
    getAllConfig: async function () {
      this.d_a_buJson = await this.getBu()
      /**
       * update 2020/04/07
      **/
      if (window.top.location.hash.split('/')[1] !== undefined || window.top.location.hash.split('/')[1] !== '') {
        this.menuKey = window.top.location.hash.split('/')[1]
        if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
          this.paramBuCode = 'ALL'
          this.$router.replace({name: this.menuKey, params: {BuCode: this.paramBuCode}})
        } else {
          this.paramBuCode = window.top.location.hash.split('/')[2]
        }
        this.paramBuCode = this.paramBuCode.toUpperCase()
      } else {
        this.paramBuCode = 'ALL'
      }

      console.log(this.$route.query);
      console.log(this.$route.query.qbu);
      if(this.$route.query.qbu !== undefined){ 
        this.paraBuCode = this.$route.query.qbu; 
      }

      // this.menuKey = window.top.location.hash.split('/')[1]
      // if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
      //   this.paramBuCode = 'ALL'
      //   this.$router.replace({name: this.menuKey, params: {BuCode: this.paramBuCode}})
      // } else {
      //   this.paramBuCode = window.top.location.hash.split('/')[2]
      // }
      // this.paramBuCode = this.paramBuCode.toUpperCase()

      let _this = this
      const buExtension = this.d_a_buJson[this.paramBuCode]['extension']
      this.d_a_buQueue = this.d_a_buJson[this.paramBuCode]['queue_id']
      this.d_a_buInstatqueue = this.d_a_buJson[this.paramBuCode]['queue_id']
      Object.keys(buExtension).forEach(function (i) {
        const start = buExtension[i][0]
        const end = buExtension[i][1]
        for (let l = start; l <= end; l++) {
          _this.d_a_buExtension.push(l)
        }
      })
    },
    getAllData: async function () {
      const _this = this
      Object.keys(this.d_a_isUseApi).map(async function (key) {
        const val = _this.d_a_isUseApi[key]
        if (key === 'extension' && val === true && _this.d_a_chkCallApl['extension'] === undefined) {
          _this.d_a_chkCallApl['extension'] = true
          await _this.getExtensions()
        } else if (key === 'queue' && val === true && _this.d_a_chkCallApl['queue'] === undefined) {
          _this.d_a_chkCallApl['queue'] = true
          await _this.getQueues()
        } else if (key === 'instatqueue' && val === true && _this.d_a_chkCallApl['instatqueue'] === undefined) {
          _this.d_a_chkCallApl['instatqueue'] = true
          await _this.getInstatqueue()
        } else if (key === 'channel' && val === true && _this.d_a_chkCallApl['channel'] === undefined) {
          _this.d_a_chkCallApl['channel'] = true
          await _this.getChannels()
        }
      })
    },
    objToObjKey: async function (whereApi, obj, key) {
      let arr = {}
      Object.keys(obj).map(function (i) {
        const id = obj[i][key]
        if (whereApi.length > 0) {
          if (whereApi.indexOf(parseInt(id)) > -1) {
            arr[id] = obj[i]
          }
        } else {
          arr[id] = obj[i]
        }
      })
      return arr
    },
    getExtensions: async function () {
      const dExtensions = await extensionService.get()
      let extensions = {}
      let whereApi = this.d_a_buExtension
      extensions = await this.objToObjKey(whereApi, dExtensions, 'id')
      if (vm.$children[0].$children[0].$refs.mainWidget !== undefined) {
        if (vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet !== undefined) {
          vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet.getExtensions(extensions)
        }
      }
      if (vm.$children[0].$children[0].$refs.subWidget !== undefined) {
        if (vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet !== undefined) {
          vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet.getExtensions(extensions)
        }
      }
      if (vm.$children[0].$children[0] !== undefined) {
        if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('Extensions') > -1) {
          vm.$children[0].$children[0].getExtensions(extensions)
        }
      }
      if (vm.$children[0].$children[0] !== undefined) {
        if (vm.$children[0].$children[0].$refs.navBar !== undefined) {
          vm.$children[0].$children[0].$refs.navBar.getExtensions(extensions)
        }
      }
      this.onExtensions(extensions)
      return extensions
    },
    onExtensions (gExtensions) {
      const _this = this
      extensionService.connect.on(extensionService.pathOn, function (res) {
        if (res.verb === 'updated') {
          if (_this.d_a_buExtension.indexOf(parseInt(res.data.id)) > -1) {
            if (vm.$children[0].$children[0].$refs.mainWidget !== undefined) {
              if (vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet !== undefined) {
                vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet.onExtensions(res.data, gExtensions)
              }
            }
            if (vm.$children[0].$children[0].$refs.subWidget !== undefined) {
              if (vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet !== undefined) {
                vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet.onExtensions(res.data, gExtensions)
              }
            }
            if (vm.$children[0].$children[0] !== undefined) {
              if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('Extensions') > -1) {
                vm.$children[0].$children[0].onExtensions(res.data, gExtensions)
              }
              if (vm.$children[0].$children[0].$refs.navBar !== undefined) {
                vm.$children[0].$children[0].$refs.navBar.onExtensions(res.data, gExtensions)
              }
            }
            gExtensions[res.data.id] = res.data
          }
        }
      })
    },
    getQueues: async function () {
      let queue = {}
      const dQueue = await queueService.get()
      let whereApi = this.d_a_buQueue
      queue = await this.objToObjKey(whereApi, dQueue, 'id')
      if (vm.$children[0].$children[0].$refs.mainWidget !== undefined) {
        vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet.getQueues(queue)
      }
      if (vm.$children[0].$children[0].$refs.subWidget !== undefined) {
        vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet.getQueues(queue)
      }
      if (vm.$children[0].$children[0] !== undefined) {
        if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('Queues') > -1) {
          vm.$children[0].$children[0].getQueues(queue)
        }
      }
      this.onQueues(queue)
      return queue
    },
    onQueues: async function (gQueue) {
      const _this = this
      queueService.connect.on(queueService.pathOn, function (res) {
        if (res.verb === 'updated') {
          if (_this.d_a_buQueue.indexOf(parseInt(res.data.id)) > -1) {
            if (vm.$children[0].$children[0].$refs.subWidget !== undefined) {
              vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet.onQueues(res.data, gQueue)
            }
            if (vm.$children[0].$children[0].$refs.mainWidget !== undefined) {
              vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet.onQueues(res.data, gQueue)
            }
            if (vm.$children[0].$children[0] !== undefined) {
              if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('Queues') > -1) {
                vm.$children[0].$children[0].onQueues(res.data, gQueue)
              }
            }
            gQueue[res.data.id] = res.data
          }
        }
      })
    },
    getInstatqueue: async function () {
      const dInstatQueueService = await instatQueueService.get()
      let instatQueue = {}
      let whereApi = this.d_a_buInstatqueue
      instatQueue = await this.objToObjKey(whereApi, dInstatQueueService, 'id')
      if (vm.$children[0].$children[0].$refs.subWidget !== undefined) {
        vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet.getInstatqueue(instatQueue)
      }
      if (vm.$children[0].$children[0].$refs.mainWidget !== undefined) {
        vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet.getInstatqueue(instatQueue)
      }
      if (vm.$children[0].$children[0] !== undefined) {
        if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('Instatqueue') > -1) {
          vm.$children[0].$children[0].getInstatqueue(instatQueue)
        }
      }
      this.onInstatqueue(instatQueue)
      return instatQueue
    },
    onInstatqueue (gInstatQueue) {
      const _this = this
      instatQueueService.connect.on(instatQueueService.pathOn, function (res) {
        if (_this.d_a_buInstatqueue.indexOf(parseInt(res.data.queue)) > -1) {
          if (res.verb === 'updated') {
            if (vm.$children[0].$children[0].$refs.mainWidget !== undefined) {
              vm.$children[0].$children[0].$refs.mainWidget.$refs.widgetSet.onInstatqueue(res.data, gInstatQueue)
            }
            if (vm.$children[0].$children[0].$refs.subWidget !== undefined) {
              vm.$children[0].$children[0].$refs.subWidget.$refs.widgetSet.onInstatqueue(res.data, gInstatQueue)
            }
            if (vm.$children[0].$children[0] !== undefined) {
              if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('Instatqueue') > -1) {
                vm.$children[0].$children[0].onInstatqueue(res.data, gInstatQueue)
              }
            }
            gInstatQueue[res.data.id] = res.data
          }
        }
      })
    },
    getChannels: async function () {
      const dChannel = await channelService.get()
      let channel = {}
      let whereApi = []
      channel = await this.objToObjKey(whereApi, dChannel, 'id')
      if (vm.$children[0].$children[0] !== undefined) {
        if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('channel') > -1) {
          vm.$children[0].$children[0].getChannels(channel)
        }
      }
      this.onChannels(channel)
      return channel
    },
    onChannels (gChannel) {
      channelService.connect.on(channelService.pathOn, function (res) {
        if (res.verb === 'updated') {
          if (vm.$children[0].$children[0] !== undefined) {
            if (vm.$children[0].$children[0].d_a_isUserApi.indexOf('channel') > -1) {
              vm.$children[0].$children[0].onChannels(res.data, gChannel)
            }
          }
          gChannel[res.data.id] = res.data
        }
      })
    },
    getBu: async function () {
      let BuJson = {}
      BuJson = await BuService.get()
      return BuJson
    },
    checkConnected () {
      let setConnected = true
      Object.keys(this.d_a_isUseApi).map(async function (key) {
        if (key === 'extension') {
          if (setConnected !== false) {
            setConnected = extensionService.connect.isConnected()
          }
        } else if (key === 'queue') {
          if (setConnected !== false) {
            setConnected = queueService.connect.isConnected()
          }
        } else if (key === 'instatqueue') {
          if (setConnected !== false) {
            setConnected = instatQueueService.connect.isConnected()
          }
        } else if (key === 'channel') {
          if (setConnected !== false) {
            setConnected = channelService.connect.isConnected()
          }
        }
      })
      if (Object.values(this.d_a_isUseApi).length <= 0) {
        setConnected = false
      }
      if (vm !== undefined) {
        if (vm.$children[0] !== undefined) {
          if (vm.$children[0].$children[0] !== undefined) {
            if (vm.$children[0].$children[0].$refs.navBar !== undefined) {
              vm.$children[0].$children[0].$refs.navBar.setConnected(setConnected)
            }
          }
        }
      }
      return setConnected
    },
    setHeightTable (isShowMenuBar, isShowMainWidget, isShowSubWidget) {
      let offsetHeight = 750
      let menuBarHeight = 0
      let mainWidgetHeight = 0
      let subWidgetHeight = 0
      if (isShowMenuBar) {
        let nav = document.getElementsByClassName('border-bottom')
        menuBarHeight = nav[0].clientHeight + 10
      }
      if (isShowMainWidget) {
        let mw = document.getElementsByClassName('mainWidget')
        mainWidgetHeight = mw[0].clientHeight + 20
      }
      if (isShowSubWidget) {
        let sw = document.getElementsByClassName('subWidget')
        subWidgetHeight = sw[0].clientHeight + 20
      }
      offsetHeight = window.innerHeight - 90 - menuBarHeight - mainWidgetHeight - subWidgetHeight

      let x = document.getElementsByClassName('b-table-sticky-header')
      x[0].style.maxHeight = offsetHeight + 'px'
    }
  }
})
window.vm = vm
// ------ note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
