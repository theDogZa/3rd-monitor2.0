<template>
  <div class="container-fluid">
    <template v-if="this.isShowMenuBar === true">
      <nav-bar ref="navBar" :title="headTitle"></nav-bar>
    </template>
    <template v-if="this.isShowMainWidget === true">
      <main-widget ref="mainWidget"></main-widget>
    </template>
    <template v-if="this.isShowSubWidget === true">
      <sub-widget ref="subWidget"></sub-widget>
    </template>
    <div class="row p-2 mb-0 ml-0 mr-0 bg-primary text-white" :class="d_s_barColor">
      <div class="col-6 font-weight-bold text-left pt-1">{{title}}</div>
      <div class="col-6 text-right">
        <div class="row">
          <div class="col-6"></div>
          <div class="text-right col-6">
            <b-form-group label="Filter : " label-cols-sm="3" label-align-sm="right" label-size="sm"
              label-for="selectSpStatus" class="mb-0">
              <b-form-select v-model="filterSpStatus" id="selectSpStatus" size="sm" :options="d_a_QueueNameFilter">
              </b-form-select>
            </b-form-group>
          </div>
        </div>
      </div>
      <br>
    </div>
    <div>
      <b-table id="table-transition" sticky-header :items="d_a_dataLists" :fields="fields" :busy.sync="isBusy"
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" striped small hover :tbody-transition-props="transProps"
        :filter-function="filterDataShow" :filter="isShow" ref="tableInboundQueue">
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
         <template v-slot:cell(name)="d">
          <div class="text-left pl-2" v-if="d.item.name!=='-'">
            {{ d.item.name }}
          </div>
          <div class="text-center" v-if="d.item.name==='-'">
            {{ d.item.name }}
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// import QueueOneApp from '../assets/config/QueueMonitor.json'
import QueueOneApp from '../../static/monitor_config/QueueMonitor.json'
import config from '../../static/monitor_config/themeConfig.json'
import navBar from './_nav-bar.vue'
import mainWidget from './_main-widget.vue'
import subWidget from './_sub-widget.vue'
export default {
  name: 'InboundQueueMonitor',
  data () {
    return {
      headTitle: this.$root.language.InboundQueueMonitor.headTitle,
      title: this.$root.language.InboundQueueMonitor.title,
      sortBy: 'id',
      sortDesc: false,
      isBusy: true,
      isShow: 'true',
      transProps: {
        name: 'flip-list'
      },
      fields: [
        { key: 'id', label: this.$root.language.InboundQueueMonitor.rowDataLabel['1'], sortable: true },
        { key: 'name', label: this.$root.language.InboundQueueMonitor.rowDataLabel['2'], sortable: true },
        { key: 'activate', label: this.$root.language.InboundQueueMonitor.rowDataLabel['3'], sortable: true },
        { key: 'readyinqueue', label: this.$root.language.InboundQueueMonitor.rowDataLabel['4'], sortable: true },
        { key: 'inused', label: this.$root.language.InboundQueueMonitor.rowDataLabel['5'], sortable: true },
        { key: 'onhold', label: this.$root.language.InboundQueueMonitor.rowDataLabel['6'], sortable: true },
        { key: 'q_paused', label: this.$root.language.InboundQueueMonitor.rowDataLabel['7'], sortable: true },
        { key: 'servicelevelperf', label: this.$root.language.InboundQueueMonitor.rowDataLabel['8'], sortable: true },
        { key: 'calls', label: this.$root.language.InboundQueueMonitor.rowDataLabel['9'], sortable: true },
        { key: 'wait', label: this.$root.language.InboundQueueMonitor.rowDataLabel['10'], sortable: true },
        { key: 'completed', label: this.$root.language.InboundQueueMonitor.rowDataLabel['11'], sortable: true },
        { key: 'abandoned', label: this.$root.language.InboundQueueMonitor.rowDataLabel['12'], sortable: true }
      ],
      filterSpStatus: 'All',
      d_a_dataLists: [],
      d_s_barColor: '',
      paramBuCode: '',
      d_b_isChkExtension: false,
      d_b_isChkQueue: false,
      d_b_isChkInstatqueue: false,
      d_a_RawDataExtensions: [],
      d_a_RawDataQueues: [],
      d_a_RawDataInstatqueue: [],
      d_a_RawDataQueueName: [],
      d_a_QueueExtensions: [],
      d_a_CheckOnline: [],
      d_a_QueueNameFilter: [],
      d_a_buJson: [],
      d_a_isUserApi: [
        'Instatqueue',
        'Extensions',
        'Queues'
      ]
    }
  },
  components: {
    navBar,
    mainWidget,
    subWidget
  },
  async created () {
    if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
      this.d_s_paramBuCode = 'ALL'
    } else {
      this.d_s_paramBuCode = window.top.location.hash.split('/')[2]
    }
    this.d_s_paramBuCode = this.d_s_paramBuCode.toUpperCase()
    this.setConfig()
    this.d_a_buJson = await this.$root.d_a_buJson[this.d_s_paramBuCode]
    await this.getQueueName()
    this.$root.chkConnectApi('inboundQueue')
  },
  mounted () {
    setInterval(this.renderData, 1000)
  },
  updated () {

  },
  methods: {
    setConfig () {
      this.d_s_barColor = 'bg-' + config.configInboundQueue.barColor
      this.isShowMenuBar = config.configInboundQueue.isShowMenuBar
      this.isShowMainWidget = config.configInboundQueue.isShowMainWidget
      this.isShowSubWidget = config.configInboundQueue.isShowSubWidget
    },
    filterDataShow (row, filter) {
      if (this.filterSpStatus === 'All') {
        return true
      } else if (row.name === this.filterSpStatus) {
        return true
      } else {
        return false
      }
    },
    renderData () {
      // this.$refs.tableInboundQueue.refresh()
    },
    getInstatqueue (gData) {
      this.d_a_RawDataInstatqueue = gData
      this.d_b_isChkInstatqueue = true
      this.setDataQueue()
    },
    onInstatqueue (onData, oldData) {
      const vi = onData
      if (this.d_a_QueueExtensions[vi.extension] === undefined) {
        this.d_a_QueueExtensions[vi.extension] = []
        this.d_a_QueueExtensions[vi.extension].push(vi.queue)
      } else {
        if (this.d_a_QueueExtensions[vi.extension].indexOf(vi.queue) < 0) {
          this.d_a_QueueExtensions[vi.extension].push(vi.queue)
        }
      }
    },
    getQueues (gData) {
      this.d_a_RawDataQueues = gData
      this.d_b_isChkQueue = true
      this.setDataQueue()
    },
    onQueues (onData) {
      const _this = this
      const vq = onData
      const key = this.d_a_dataLists.findIndex(x => x.id === vq.id)
      if (key !== undefined) {
        let de = this.d_a_dataLists[key]
        if (de !== undefined) {
          de.servicelevelperf = vq.servicelevelperf
          de.calls = vq.calls
          de.wait = vq.wait
          de.completed = vq.completed
          de.abandoned = vq.abandoned
        }
      } else {
        let de = {}
        de.id = vq.id
        de.name = _this.d_a_RawDataQueueName[vq.id].desc
        de.activate = 0
        de.readyinqueue = 0
        de.inused = 0
        de.onhold = 0
        de.q_paused = 0
        de.servicelevelperf = vq.servicelevelperf
        de.calls = vq.calls
        de.wait = vq.wait
        de.completed = vq.completed
        de.abandoned = vq.abandoned
        this.d_a_dataLists.push(de)
      }
    },
    getExtensions (gData) {
      this.d_a_RawDataExtensions = gData
      this.d_b_isChkExtension = true
      this.setDataQueue()
    },
    onExtensions (onData) {
      const _this = this
      const extension = onData
      if (this.d_a_RawDataExtensions[extension.id] === undefined) {
        this.d_a_RawDataExtensions[extension.id] = extension
      }
      const extensionOld = this.d_a_RawDataExtensions[extension.id]
      if (this.d_a_QueueExtensions[extension.id] !== undefined) {
        Object.values(this.d_a_QueueExtensions[extension.id]).map(function (queueId, k) {
          const key = _this.d_a_dataLists.findIndex(x => x.id === queueId)
          if (key !== undefined) {
            let de = _this.d_a_dataLists[key]
            if (de !== undefined) {
              if (extensionOld.q_status !== extension.q_status || extensionOld.q_login !== extension.q_login || extensionOld.q_paused !== extension.q_paused) {
                // ---------------------- readyinqueue --------------
                let rqChange = false
                let roStatus = false
                if (extension.q_status === 1 || extension.q_status === 6) {
                  rqChange = true
                }
                if (extensionOld.q_status === 1 || extensionOld.q_status === 6) {
                  roStatus = true
                }
                if ((rqChange === true && extension.q_login === true && extension.q_paused !== true) && (roStatus !== true || extensionOld.q_paused === true || extensionOld.q_login !== true)) {
                  de.readyinqueue = de.readyinqueue + 1
                } else if ((extension.q_login !== true || extension.q_paused === true || rqChange !== true) && (roStatus === true && extensionOld.q_paused !== true && extensionOld.q_login === true)) {
                  de.readyinqueue = de.readyinqueue - 1
                }
                // if (((extension.q_status === 1 || extension.q_status === 6) && extension.q_login === true && extension.q_paused !== true) && ((extensionOld.q_status !== 1 || extensionOld.q_status !== 6) || extensionOld.q_paused === true || extensionOld.q_login !== true)) {
                //   de.readyinqueue = de.readyinqueue + 1
                // } else if ((extension.q_login !== true || extension.q_paused === true || (extension.q_status !== 1 || extension.q_status !== 6)) && ((extensionOld.q_status === 1 || extensionOld.q_status === 6) && extensionOld.q_paused !== true && extensionOld.q_login === true)) {
                //   de.readyinqueue = de.readyinqueue - 1
                // }
                // ---------------------- inused
                let qChange = false
                let oStatus = false
                if (extension.q_status === 2 || extension.q_status === 7) {
                  qChange = true
                }
                if (extensionOld.q_status === 2 || extensionOld.q_status === 7) {
                  oStatus = true
                }
                if ((extension.q_login === true && qChange === true) && (oStatus !== true || extensionOld.q_login !== true)) {
                  de.inused = de.inused + 1
                } else if ((extension.q_login !== true || qChange === false) && (oStatus === true && extensionOld.q_login === true)) {
                  de.inused = de.inused - 1
                }
                // ---------------------- onhold
                if (extension.q_status === 8 && extension.q_login === true) {
                  de.onhold = de.onhold + 1
                } else if ((extension.q_status !== 8 || extension.q_login !== true) && (extensionOld.q_status === 8 && extensionOld.q_login === true)) {
                  de.onhold = de.onhold - 1
                }
                // ---------------------- q_paused
                if (extensionOld.q_login !== extension.q_login || extensionOld.q_paused !== extension.q_paused || extensionOld.q_status !== extension.q_status) {
                  if ((extension.q_login === true && extension.q_paused === true && extension.q_status === 1) && (extensionOld.q_paused !== true || extensionOld.q_status !== 1)) {
                    de.q_paused = de.q_paused + 1
                  } else if ((extension.q_login !== true || extension.q_paused !== true || extension.q_status !== 1) && (extensionOld.q_paused === true && extensionOld.q_status === 1)) {
                    de.q_paused = de.q_paused - 1
                  }
                }
                // ---------------------- activate
                const extensionOnline = _this._agentOnline(extension.q_status, extension.q_login, extension.q_paused, extension.exstatus)
                const extensionOnlineOld = _this.d_a_CheckOnline[extension.id][queueId]
                if (extensionOnline !== extensionOnlineOld) {
                  if (extensionOnline === true) {
                    de.activate = de.activate + 1
                  } else {
                    de.activate = de.activate - 1
                  }
                  _this.d_a_CheckOnline[extension.id][queueId] = extensionOnline
                }
              }
            }
          }
        })
      }
    },
    getQueueName: async function () {
      const _this = this
      this.d_a_RawDataQueueName = QueueOneApp.QueueMonitor
      this.d_a_QueueNameFilter.push('All')
      this.d_a_buJson = await this.$root.d_a_buJson[this.d_s_paramBuCode]
      const QueueInBu = this.d_a_buJson['queue_id']
      Object.values(this.d_a_RawDataQueueName).map(function (v, k) {
        if (QueueInBu.indexOf(parseInt(v.name)) > -1) {
          _this.d_a_QueueNameFilter.push(v.desc)
        }
      })
    },
    removeDuplicateUsingFilter (arr) {
      let uniArray = arr.filter(function (elem, index, self) {
        return index === self.indexOf(elem)
      })
      return uniArray
    },
    setDataQueue () {
      const _this = this
      let newArr = []
      let newDataInstatqueue = []
      let newDataInstatqueue2 = []
      if (this.d_b_isChkExtension === true && this.d_b_isChkQueue === true && this.d_b_isChkInstatqueue === true) {
        Object.values(this.d_a_RawDataInstatqueue).map(function (vi, k) {
          if (newDataInstatqueue[vi.queue] === undefined) {
            newDataInstatqueue[vi.queue] = []
          }
          if (newDataInstatqueue2[vi.extension] === undefined) {
            newDataInstatqueue2[vi.extension] = []
          }
          newDataInstatqueue[vi.queue].push(vi.extension)
          newDataInstatqueue2[vi.extension].push(vi.queue)
        })
        this.d_a_QueueExtensions = newDataInstatqueue2
        Object.values(this.d_a_RawDataQueues).map(function (vq, k) {
          let sumActive = 0
          let sumReadyInQueue = 0
          let sumInUsed = 0
          let sumOnHold = 0
          let sumQpaused = 0
          if (vq) {
            if (newDataInstatqueue[vq.id] !== undefined) {
              Object.values(newDataInstatqueue[vq.id]).map(function (extensionId, k) {
                const extension = _this.d_a_RawDataExtensions[extensionId]
                if (extension !== undefined) {
                  if (extension.q_login === true && extension.q_paused !== true && extension.q_status === 1) {
                    sumReadyInQueue = sumReadyInQueue + 1
                  }
                  if (extension.q_login === true && (extension.q_status === 2 || extension.q_status === 7)) {
                    sumInUsed = sumInUsed + 1
                  }
                  if (extension.q_login === true && extension.q_status === 8) {
                    sumOnHold = sumOnHold + 1
                  }
                  if (extension.q_login === true && extension.q_paused === true && extension.q_status === 1) {
                    sumQpaused = sumQpaused + 1
                  }
                  const extensionOnline = _this._agentOnline(extension.q_status, extension.q_login, extension.q_paused, extension.exstatus)
                  if (_this.d_a_CheckOnline[extensionId] === undefined) {
                    _this.d_a_CheckOnline[extensionId] = []
                  }
                  _this.d_a_CheckOnline[extensionId][vq.id] = extensionOnline
                  if (extensionOnline === true) {
                    sumActive = sumActive + 1
                  }
                }
              })
            }
            let de = {}
            de.id = vq.id
            de.name = _this.d_a_RawDataQueueName[vq.id].desc
            de.activate = sumActive
            de.readyinqueue = sumReadyInQueue
            de.inused = sumInUsed
            de.onhold = sumOnHold
            de.q_paused = sumQpaused
            de.servicelevelperf = vq.servicelevelperf
            de.calls = vq.calls
            de.wait = vq.wait
            de.completed = vq.completed
            de.abandoned = vq.abandoned
            newArr.push(de)
          }
        })
        this.d_a_dataLists = newArr
        this.isBusy = false
        this.$root.setHeightTable(this.isShowMenuBar, this.isShowMainWidget, this.isShowSubWidget)
      }
    },
    _agentOnline (s, l, p, es) {
      let nv = false
      if (!p && (s === 0 || s === 3 || s === 4 || s === 5)) {
        nv = false
      } else if (l && p && s === 1) {
        nv = true
      } else if (l && (s && s !== 5 && es !== 4)) {
        nv = true
      } else if (es >= 0 && typeof es !== 'undefined' && es !== null && es !== 4 && es !== 21) {
        nv = true
      } else {
        nv = false
      }
      return nv
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table#table-transition .flip-list-move {
  transition: transform 1s;
}
table#table-transition{
  font-size: 0.8rem !important;
}
/* table#table-transition > thead > tr > th ,
table#table-transition > thead > tr > .table-b-table-default {
  background-color: brown !important;
  height: 50px !important;
} */
.card-text .b-table-sticky-header{
  max-height: 200px;
  font-size: 0.8rem !important;
}
.b-table-sticky-header{
  max-height: 500px;
  font-size: 0.8rem !important;
}

table .badge{
  font-size: 0.8rem !important;
  color: white;
}
</style>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
