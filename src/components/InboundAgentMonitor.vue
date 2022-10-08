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
    <div class="row p-2 mb-0 ml-0 mr-0 text-white" :class="barColor">
      <div class="col-6 font-weight-bold text-left pt-1">{{title}}</div>
      <div class="col-6 text-right">
        <div class="row">
          <div class="col-6"></div>
          <div class="text-right col-6">
            <b-form-group label="Filter : " label-cols-sm="3" label-align-sm="right" label-size="sm"
              label-for="selectSpStatus" class="mb-0">
              <b-form-select v-model="filterSpStatus" id="selectSpStatus" size="sm"
                :options="['All', 'Not in Use','Ringing', 'On Hold', 'In Use', 'Paused' ,'Other']"></b-form-select>
            </b-form-group>
          </div>
        </div>
      </div>
      <br>
    </div>
    <b-table id="table-transition" sticky-header :items="d_a_dataLists" :fields="fields" :busy.sync="isBusy"
      :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" striped small hover :tbody-transition-props="transProps"
      :filter="isShow" :filter-function="filterDataShow" ref="tableInboundAgent">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(spStatus)="d">
        <div class="text-left">
          <b-button variant="info" size="sm" class="pt-0 pb-0 pl-1 pr-1" @click="d.toggleDetails"
            v-if='d.detailsShowing === false'>
            <icon-plus-circle-outline />
          </b-button>
          <b-button variant="danger" size="sm" class="pt-0 pb-0 pl-1 pr-1" @click="d.toggleDetails"
            v-if='d.detailsShowing === true'>
            <icon-minus-circle-outline />
          </b-button>
          <b-badge pill :variant="d.value.class">{{ d.value.text }}</b-badge>
          <template v-if="d.value.presencetxt">{{ d.value.presencetxt }}</template>
        </div>
      </template>
      <template v-slot:cell(lastUpdate)="d">
        {{ d.item.lastUpdate | DiffTimeNow }}
      </template>
      <template v-slot:cell(team)="d">
          <div class="text-left pl-2" v-if="d.item.team!=='-'">
            {{ d.item.team }}
          </div>
          <div class="text-center" v-if="d.item.team==='-'">
            {{ d.item.team }}
          </div>
      </template>
      <template v-slot:cell(agentName)="d">
          <div class="text-left pl-2" v-if="d.item.agentName!=='-'">
            {{ d.item.agentName }}
          </div>
          <div class="text-center" v-if="d.item.agentName==='-'">
            {{ d.item.agentName }}
          </div>
      </template>
      <template v-slot:cell(lastHangup)="d">
        <template v-if="d.item.lastHangup">{{ d.item.lastHangup | formatDate }} </template>
      </template>
      <template v-slot:cell(instatLogin)="d">
        <template v-if="d.item.instatLogin">{{ d.item.instatLogin | DiffTimeNow  }}</template>
      </template>
      <template v-slot:cell(instatTransfer)="d">
        <template v-if="d.item.instatTransfer !== null">{{ d.item.instatTransfer }} </template>
      </template>
      <template v-slot:cell(instatAnswer)="d">
        <template v-if="d.item.instatAnswer !== null">{{ d.item.instatAnswer }}</template>
      </template>
      <template v-slot:cell(instatMissCall)="d">
        <template v-if="d.item.instatMissCall !== null">{{ d.item.instatMissCall }}</template>
      </template>
      <template v-slot:cell(instatMaxTalk)="d">
        <template>{{ d.item.instatMaxTalk | millisecondsToTime  }} </template>
      </template>
      <template v-slot:cell(instatAvgTalk)="d">
        <template>{{ d.item.instatAvgTalk | millisecondsToTime  }}</template>
      </template>
      <template v-slot:cell(instatTotalTalkTime)="d">
        <template>{{ d.item.instatTotalTalkTime | millisecondsToTime  }} </template>
      </template>
      <template v-slot:cell(instatMaxWT)="d">
        <template>{{ d.item.instatMaxWT | millisecondsToTime  }}</template>
      </template>
      <template v-slot:cell(instatAvgWT)="d">
        <template>{{ d.item.instatAvgWT | millisecondsToTime  }}</template>
      </template>
      <template v-slot:cell(instatTotalWT)="d">
        <template>{{ d.item.instatTotalWT | millisecondsToTime  }}</template>
      </template>
      <template v-slot:row-details="row">
        <b-container fluid>
          <br>
          <b-row>
            <b-col>
              <b-card header-tag="header" border-variant="dark" header="dark" header-bg-variant="dark"
                header-text-variant="white">
                <template v-slot:header>
                  <h6 class="mb-0">Telephony Activities</h6>
                </template>
                <b-card-text>
                  <b-table id="table-DetialExtension" sticky-header striped hover :items="row.item.dataDetialExtension"
                    :fields="fieldsDetialExtension" :sort-by.sync="sortByDE" :sort-desc.sync="sortDescDE">
                    <template v-slot:cell(dateTimeDE)="d">
                      <template v-if="d.item.dateTimeDE">{{ d.item.dateTimeDE | formatDate }} </template>
                    </template>
                    <template v-slot:cell(statusDE)="d">
                      <div class="">
                        <b-badge pill :variant="d.value.class">{{ d.value.text }}</b-badge>
                        <template v-if="d.value.presencetxt">{{ d.value.presencetxt }}</template>
                      </div>
                    </template>
                  </b-table>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card header-tag="header" border-variant="dark" header="dark" header-bg-variant="dark"
                header-text-variant="white">
                <template v-slot:header>
                  <h6 class="mb-0">Telephone Number</h6>
                </template>
                <b-card-text>
                  <table class="table thead-light">
                    <thead>
                      <tr>
                        <th scope="col">Called Number</th>
                        <th scope="col">Call ANI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                </b-card-text>
              </b-card>
              <!-- <br>
              <b-card header-tag="header" border-variant="dark" header="dark" header-bg-variant="dark"
                header-text-variant="white">
                <template v-slot:header>
                  <h6 class="mb-0">Change Status</h6>
                </template>
                <b-card-text>
                  <table class="table thead-light">
                    <thead>
                      <tr>
                        <th scope="col">Current Status</th>
                        <th scope="col">Change Status to</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h5 class="pt-2" :class="row.item.spStatus.class">{{ row.item.spStatus.text  }}
                            <template v-if="row.item.presencetxt"><small
                                class="text-dark">({{ row.item.spStatus.presencetxt }})</small></template>
                          </h5>
                        </td>
                        <td>
                          <b-button variant="success" disabled>Login</b-button>
                          <b-button variant="danger" disabled>Logout</b-button>
                          <b-button variant="warning" disabled>Unpause</b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-card-text>
              </b-card> -->
            </b-col>
          </b-row>
          <br>
        </b-container>
      </template>
    </b-table>
  </div>
</template>

<script>
import statusShow from '../assets/config/status.json'
import config from '../../static/monitor_config/themeConfig.json'
import navBar from './_nav-bar.vue'
import mainWidget from './_main-widget.vue'
import subWidget from './_sub-widget.vue'
import usersService from '../services/UsersService'
import moment from 'moment'
import PlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'
import MinusCircleOutline from 'vue-material-design-icons/MinusCircleOutline.vue'
export default {
  name: 'InboundAgentMonitor',
  data () {
    return {
      // data variable : d_s_ = data_string , d_i_ = data_integer ,  d_a_ = data_array , d_o_ = data_object ,d_b_ = data_boolean
      headTitle: this.$root.language.InboundAgentMonitor.headTitle,
      title: this.$root.language.InboundAgentMonitor.title,
      barColor: '',
      isShowMenuBar: true,
      isShowMainWidget: true,
      isShowSubWidget: true,
      sortBy: 'team',
      sortDesc: false,
      isBusy: true,
      isShow: 'true',
      transProps: {
        name: 'flip-list'
      },
      fields: [
        { key: 'spStatus', label: this.$root.language.InboundAgentMonitor.rowDataLabel[1], sortable: true },
        { key: 'lastUpdate', label: this.$root.language.InboundAgentMonitor.rowDataLabel[2], sortable: true },
        { key: 'lastHangup', label: this.$root.language.InboundAgentMonitor.rowDataLabel[3], sortable: true },
        { key: 'team', label: this.$root.language.InboundAgentMonitor.rowDataLabel[4], sortable: true },
        { key: 'agentName', label: this.$root.language.InboundAgentMonitor.rowDataLabel[5], sortable: true },
        { key: 'instatLogin', label: this.$root.language.InboundAgentMonitor.rowDataLabel[6], sortable: true },
        { key: 'instatTransfer', label: this.$root.language.InboundAgentMonitor.rowDataLabel[7], sortable: true },
        { key: 'instatAnswer', label: this.$root.language.InboundAgentMonitor.rowDataLabel[8], sortable: true },
        { key: 'instatMissCall', label: this.$root.language.InboundAgentMonitor.rowDataLabel[9], sortable: true },
        { key: 'instatMaxTalk', label: this.$root.language.InboundAgentMonitor.rowDataLabel[10], sortable: true },
        { key: 'instatAvgTalk', label: this.$root.language.InboundAgentMonitor.rowDataLabel[11], sortable: true },
        { key: 'instatTotalTalkTime', label: this.$root.language.InboundAgentMonitor.rowDataLabel[12], sortable: true },
        { key: 'instatMaxWT', label: this.$root.language.InboundAgentMonitor.rowDataLabel[13], sortable: true },
        { key: 'instatAvgWT', label: this.$root.language.InboundAgentMonitor.rowDataLabel[14], sortable: true },
        { key: 'instatTotalWT', label: this.$root.language.InboundAgentMonitor.rowDataLabel[15], sortable: true }
      ],
      filterSpStatus: 'All',
      sortByDE: 'dateTimeDE',
      sortDescDE: true,
      fieldsDetialExtension: [
        { key: 'dateTimeDE', label: 'Date and Time' },
        { key: 'statusDE', label: 'Status' }
      ],
      d_a_dataLists: [],
      d_a_RawDataExtensions: [],
      d_a_RawDataQueues: [],
      d_a_RawDataInstatqueue: [],
      d_o_DataInstatqueue: {},
      paramBuCode: '',
      d_a_isUserApi: [
        'Extensions',
        'Queues',
        'Instatqueue'
      ],
      d_b_isChkExtension: false,
      d_b_isChkQueue: false,
      d_b_isChkInstatqueue: false,
      d_b_isDetailsShowing: false
    }
  },
  components: {
    navBar,
    mainWidget,
    subWidget,
    'IconPlusCircleOutline': PlusCircleOutline,
    'IconMinusCircleOutline': MinusCircleOutline
  },
  created () {
    this.setConfig()
    this.getUser()
    /**
      * update 2020/04/07
    **/
    if (window.top.location.hash.split('/')[1] !== undefined || window.top.location.hash.split('/')[1] !== '') {
      if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
        this.d_s_paramBuCode = 'ALL'
      } else {
        this.d_s_paramBuCode = window.top.location.hash.split('/')[2]
      }
      this.d_s_paramBuCode = this.d_s_paramBuCode.toUpperCase()
    } else {
      this.d_s_paramBuCode = 'ALL'
    }
    // if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
    //   this.d_s_paramBuCode = 'ALL'
    // } else {
    //   this.d_s_paramBuCode = window.top.location.hash.split('/')[2]
    // }
    // this.d_s_paramBuCode = this.d_s_paramBuCode.toUpperCase()
    this.$root.chkConnectApi('inboundAgent')
    this.$root.getAllData()
  },
  mounted () {
  },
  updated () {
  },
  methods: {
    setConfig () {
      this.barColor = 'bg-' + config.configInboundAgent.barColor
      this.isShowMenuBar = config.configInboundAgent.isShowMenuBar
      this.isShowMainWidget = config.configInboundAgent.isShowMainWidget
      this.isShowSubWidget = config.configInboundAgent.isShowSubWidget
    },
    getUser: async function () {
      const _this = this
      const usersRawData = await usersService.get()
      const users = await this.objToObjKey(usersRawData, 'extension')
      Object.values(this.d_a_dataLists).map(function (dl, k) {
        const user = users[dl.extension]
        if (user !== undefined) {
          _this.d_a_dataLists[k].team = user.head_name
          _this.d_a_dataLists[k].agentName = user.firstname_thai + ' ' + user.lastname_thai + ' (' + dl.extension + ')'
        }
      })
      this.isBusy = false
      this.$root.setHeightTable(this.isShowMenuBar, this.isShowMainWidget, this.isShowSubWidget)
    },
    getInstatqueue (gData) {
      this.d_a_RawDataInstatqueue = gData
      this.d_b_isChkInstatqueue = true
      this.setDataAgent()
    },
    onInstatqueue (onData, oldData) {
      const _this = this
      const di = onData
      const key = this.d_a_dataLists.findIndex(x => x.extension === di.extension)
      let diq = {}
      let de = {}
      if (this.d_a_dataLists[key] !== undefined) {
        de = this.d_a_dataLists[key]
      }
      if (this.d_o_DataInstatqueue[di.extension] === undefined) {
        this.d_o_DataInstatqueue[di.extension] = {}
      }
      if (this.d_o_DataInstatqueue[di.extension][di.queue] === undefined) {
        this.d_o_DataInstatqueue[di.extension][di.queue] = {}
        if (de !== undefined && de !== '') {
          // // ------------ lasthangup
          // de.lastHangup = _this._max(di.lasthangup, de.lastHangup)
          // // ------------ login
          // de.instatLogin = _this._min(di.login, de.instatLogin)
          // ------------ instatMaxWT
          de.instatMaxWT = _this._max(di.maxwait, de.instatMaxWT)
          // ------------ maxtalk
          de.instatMaxTalk = _this._max(di.maxtalk, de.instatMaxTalk)
          // ------------ instatTotalWT
          de.instatTotalWT = _this._sum(di.waittime, de.instatTotalWT)
          // ------------ de.instatTotalTalkTime
          de.instatTotalTalkTime = _this._sum(di.talktime, de.instatTotalTalkTime)
          // ------------ de.transfer
          de.instatTransfer = _this._sum(di.transfer, de.instatTransfer)
          // ------------ de.misscall
          de.instatMissCall = _this._sum(di.misscall, de.instatMissCall)
          // ------------ de.answer
          de.instatAnswer = _this._sum(di.answer, de.instatAnswer)
          // ------------ de.instatAvgTalk
          de.instatAvgTalk = de.instatTotalTalkTime / de.instatAnswer
          // ------------ de.instatAvgWT
          de.instatAvgWT = de.instatTotalWT / de.instatAnswer
          this.d_o_DataInstatqueue[di.extension][di.queue] = di
        }
      } else {
        diq = this.d_o_DataInstatqueue[di.extension][di.queue]
        if (di.talktime !== undefined && di.answer !== undefined && di.misscall !== undefined) {
          if (key !== undefined) {
            // ------------ lasthangup
            // de.lastHangup = _this._max(di.lasthangup, de.lastHangup)
            // ------------ login
            // de.instatLogin = _this._min(di.login, de.instatLogin)
            // ------------ instatMaxWT
            de.instatMaxWT = _this._max(di.maxwait, de.instatMaxWT)
            // ------------ maxtalk
            de.instatMaxTalk = _this._max(di.maxtalk, de.instatMaxTalk)
            // ------------ instatTotalWT
            const diffInstatTotalWT = de.instatTotalWT - diq.waittime
            de.instatTotalWT = _this._sum(di.waittime, diffInstatTotalWT)
            // ------------ de.instatTotalTalkTime
            const diffInstatTotalTalkTime = de.instatTotalTalkTime - diq.talktime
            de.instatTotalTalkTime = _this._sum(di.talktime, diffInstatTotalTalkTime)
            // ------------ de.transfer
            const diffInstatTransfer = de.instatTransfer - diq.transfer
            de.instatTransfer = _this._sum(di.transfer, diffInstatTransfer)
            // ------------ de.misscall
            const diffInstatMissCall = de.instatMissCall - diq.misscall
            de.instatMissCall = _this._sum(di.misscall, diffInstatMissCall)
            // ------------ de.answer
            const diffInstatAnswer = de.instatAnswer - diq.answer
            de.instatAnswer = _this._sum(di.answer, diffInstatAnswer)
            // ------------ de.instatAvgTalk
            de.instatAvgTalk = de.instatTotalTalkTime / de.instatAnswer
            // ------------ de.instatAvgWT
            de.instatAvgWT = de.instatTotalWT / de.instatAnswer
          }
          this.d_o_DataInstatqueue[di.extension][di.queue] = di
        } else if (di.lasthangup !== undefined) {
          // ------------ lasthangup
          if (de === undefined) {
            let de = {}
            de.lastHangup = 0
            de.lastHangup = _this._max(di.lasthangup, de.lastHangup)
          } else {
            de.lastHangup = _this._max(di.lasthangup, de.lastHangup)
          }
        }
      }
    },
    getExtensions (gData) {
      this.d_a_RawDataExtensions = gData
      this.d_b_isChkExtension = true
      this.setDataAgent()
    },
    onExtensions (onData) {
      const e = onData
      const key = this.d_a_dataLists.findIndex(x => x.extension === e.id)
      let de = this.d_a_dataLists[key]
      if (de !== undefined) {
        de.isShow = this._agentOnline(e.q_status, e.q_login, e.q_paused, e.exstatus)
        de.spStatus = this._agentStatus(e.q_status, e.q_login, e.q_paused, e.q_presencetxt, e.exstatus)
        de.lastUpdate = this._agentTimeUpdate(e.q_status, e.q_login, e.q_paused, e.q_presencetxt, e.exstatus, de)
        if (de.dataDetialExtension[de.dataDetialExtension.length - 1] !== undefined) {
          if (de.dataDetialExtension[de.dataDetialExtension.length - 1].statusDE !== undefined) {
            if (de.dataDetialExtension[de.dataDetialExtension.length - 1].statusDE.text !== de.spStatus.text) {
              let dv = {}
              dv.dateTimeDE = []
              dv.loop = []
              dv.statusDE = []
              dv.dateTimeDE = moment()
              dv.statusDE = de.spStatus
              dv.loop = de.dataDetialExtension.length + 1
              de.dataDetialExtension.push(dv)
              if (de.dataDetialExtension.length > 15) {
                de.dataDetialExtension.splice(0, 1)
              }
            }
          }
        }
      }
    },
    getQueues (gData) {
      this.d_a_RawDataQueues = gData
      this.d_b_isChkQueue = true
      this.setDataAgent()
    },
    onQueues (onData) {

    },
    setDataAgent () {
      const _this = this
      let newArr = []
      const dInstatqueue = _this.d_a_RawDataInstatqueue
      if (this.d_b_isChkExtension === true && this.d_b_isChkQueue === true && this.d_b_isChkInstatqueue === true) {
        Object.values(this.d_a_RawDataExtensions).map(function (e, k) {
          if (e) {
            // user online
            // de = Data Extensions
            let de = {}
            de.dataDetialExtension = []
            de.isShow = _this._agentOnline(e.q_status, e.q_login, e.q_paused, e.exstatus)
            de.extension = e.id
            de.spStatus = _this._agentStatus(e.q_status, e.q_login, e.q_paused, e.q_presencetxt, e.exstatus)
            if (de.agentName === undefined) {
              de.agentName = ''
            }
            de.lastUpdate = moment()
            de.agentName = de.agentName + ' (' + e.id + ')'

            if (de.isShow === true) {
              let dv = {}
              dv.dateTimeDE = ''
              dv.statusDE = []
              dv.loop = ''
              dv.dateTimeDE = moment()
              dv.statusDE = de.spStatus
              dv.loop = 0
              de.dataDetialExtension.push(dv)
            }

            Object.values(_this.d_a_RawDataQueues).map(function (q) {
              const key = q.id + '_' + e.id
              // di = Data Instatqueue
              const di = dInstatqueue[key]
              if (_this.d_o_DataInstatqueue[e.id] === undefined) {
                _this.d_o_DataInstatqueue[e.id] = {}
              }
              _this.d_o_DataInstatqueue[e.id][q.id] = di

              if (di !== undefined) {
                // de.isShow = isShow
                // ------------ lasthangup
                de.lastHangup = _this._max(di.lasthangup, de.lastHangup)
                // ------------ login
                de.instatLogin = _this._min(di.login, de.instatLogin)
                // ------------ instatMaxWT
                de.instatMaxWT = _this._max(di.maxwait, de.instatMaxWT)
                // ------------ maxtalk
                de.instatMaxTalk = _this._max(di.maxtalk, de.instatMaxTalk)
                // ------------ instatTotalWT
                de.instatTotalWT = _this._sum(di.waittime, de.instatTotalWT)
                // ------------ de.instatTotalTalkTime
                de.instatTotalTalkTime = _this._sum(di.talktime, de.instatTotalTalkTime)
                // ------------ de.transfer
                de.instatTransfer = _this._sum(di.transfer, de.instatTransfer)
                // ------------ de.misscall
                de.instatMissCall = _this._sum(di.misscall, de.instatMissCall)
                // ------------ de.answer
                de.instatAnswer = _this._sum(di.answer, de.instatAnswer)
                // ------------ de.instatAvgTalk
                de.instatAvgTalk = de.instatTotalTalkTime / de.instatAnswer
                // ------------ de.instatAvgWT
                de.instatAvgWT = de.instatTotalWT / de.instatAnswer
              }
            })
            newArr.push(de)
          } else {
            // user offline
          }
        })
        this.d_a_dataLists = newArr
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
    },
    _agentTimeUpdate (s, l, p, t, es, de) {
      // s = status, l = login , p = paused, t = presencetxt
      let nv = ''
      if (p !== de.q_paused || s !== de.q_status || l !== de.q_login || t !== de.q_presencetxt || es !== de.exstatus) {
        nv = moment()
      }
      return nv
    },
    _agentStatus (s, l, p, t, es) {
      // s = status, l = login , p = paused, t = presencetxt
      let nv = {}
      if (!p && (s === 0 || s === 3 || s === 4 || s === 5)) {

      } else if (l && p && s === 1) {
        nv.text = statusShow.QueueStatus[9].txt
        nv.textClass = 'text-' + statusShow.QueueStatus[9].class
        nv.class = statusShow.QueueStatus[9].class
        nv.presencetxt = t
      } else if (l && (s && s !== 5 && es !== 4)) {
        nv.text = statusShow.QueueStatus[s].txt
        nv.textClass = 'text-' + statusShow.QueueStatus[s].class
        nv.class = statusShow.QueueStatus[s].class
        nv.presencetxt = ''
      } else if (es >= 0 && typeof es !== 'undefined' && es !== null && es !== 4 && es !== 21) {
        nv.text = statusShow.ExStatus[es].txt
        nv.textClass = 'text-' + statusShow.ExStatus[es].class
        nv.class = statusShow.ExStatus[es].class
        nv.presencetxt = ''
      } else {
        // nv.text = statusShow.ExStatus[-1].txt
        // nv.textClass = 'text-' + statusShow.ExStatus[-1].class
        // nv.class = statusShow.ExStatus[-1].class
        // nv.presencetxt = ''
      }
      if (nv.class === 'blue') {
        nv.class = 'primary'
      }
      return nv
    },
    _sum (n, o) {
      let nv = 0
      if (o !== undefined) {
        nv = parseInt(o) + parseInt(n)
      } else {
        nv = parseInt(n)
      }
      return nv
    },
    _max (n, o) {
      let nv = ''
      if (o !== undefined) {
        if (n > o) { nv = n } else { nv = o }
      } else {
        nv = n
      }
      return nv
    },
    _min (n, o) {
      let nv = ''
      if (o !== undefined) {
        if (n < o) { nv = n } else { nv = o }
      } else {
        nv = n
      }
      return nv
    },
    filterDataShow (row, filter) {
      if (row.isShow !== true) {
        return false
      } else {
        if (this.filterSpStatus !== null) {
          if (this.filterSpStatus === 'All') {
            return true
          } else if (this.filterSpStatus === 'Other') {
            if (row.spStatus.text !== 'Not in Use' && row.spStatus.text !== 'On Hold' && row.spStatus.text !== 'Ringing' && row.spStatus.text !== 'In Use' && row.spStatus.text !== 'Paused') {
              return true
            } else {
              return false
            }
          } else if (row.spStatus.text === this.filterSpStatus) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    },
    renderData () {
      this.$refs.tableInboundAgent.refresh()
    },
    objToObjKey: async function (obj, key) {
      let arr = {}
      Object.keys(obj).map(function (i) {
        const id = obj[i][key]
        arr[id] = obj[i]
      })
      return arr
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
