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
      <!-- row data -->
      <div class="row p-2 mb-0 ml-0 mr-0 text-white" :class="barColor">
        <div class="col-6 font-weight-bold text-left pt-1">{{title}}</div>
        <div class="col-6 text-right">
          <div class="row">
            <div class="col-6"></div>
            <div class="text-right col-6">
              <b-form-group label="Filter : " label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="selectGroupChannel" class="mb-0" >
                <b-form-select v-model="filterGroupChannel" id="selectGroupChannel" size="sm" :options="d_a_GroupChannelName"></b-form-select>
              </b-form-group>
            </div>
          </div>
        </div>
        <br>
      </div>
      <b-table id="table-transition" sticky-header :items="d_a_dataLists" :fields="fields" :busy.sync="isBusy"
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" striped small hover :tbody-transition-props="transProps"
        :filter-function="filterDataShow" :filter="isShow" ref="tableInboundChannel">
         <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          </template>
         <template v-slot:cell(GroupChannel)="d">
          <div class="text-left pl-2" v-if="d.item.GroupChannel!=='-'">
            {{ d.item.GroupChannel }}
          </div>
          <div class="text-center" v-if="d.item.GroupChannel==='-'">
            {{ d.item.GroupChannel }}
          </div>
        </template>
         <template v-slot:cell(ChannelName)="d">
          <div class="text-left">
            {{ d.item.ChannelName }}
          </div>
        </template>
      </b-table>
  </div>
</template>

<script>
import channelOneAppService from '../services/ChannelOneAppService'
import channelGroupOneAppService from '../services/ChannelGroupOneAppService'
import navBar from './_nav-bar.vue'
import mainWidget from './_main-widget.vue'
import subWidget from './_sub-widget.vue'
import config from '../../static/monitor_config/themeConfig.json'
import buJson from '../../static/monitor_config/Bu.json'

export default {
  name: 'InboundChannelMonitor',
  data () {
    return {
      headTitle: this.$root.language.InboundChannelMonitor.headTitle,
      title: this.$root.language.InboundChannelMonitor.title,
      barColor: '',
      sortBy: 'GroupChannel',
      sortDesc: false,
      isBusy: true,
      isShow: 'true',
      transProps: {
        name: 'flip-list'
      },
      fields: [
        { key: 'GroupChannel', label: this.$root.language.InboundChannelMonitor.rowDataLabel['1'], sortable: true },
        { key: 'name', label: this.$root.language.InboundChannelMonitor.rowDataLabel['2'], sortable: true },
        { key: 'ChannelName', label: this.$root.language.InboundChannelMonitor.rowDataLabel['3'], sortable: true },
        { key: 'calls', label: this.$root.language.InboundChannelMonitor.rowDataLabel['4'], sortable: true },
        { key: 'wait', label: this.$root.language.InboundChannelMonitor.rowDataLabel['5'], sortable: true },
        { key: 'completed', label: this.$root.language.InboundChannelMonitor.rowDataLabel['6'], sortable: true },
        { key: 'abandoned', label: this.$root.language.InboundChannelMonitor.rowDataLabel['7'], sortable: true },
        { key: 'perHandle', label: this.$root.language.InboundChannelMonitor.rowDataLabel['8'], sortable: true },
        { key: 'perAbandoned', label: this.$root.language.InboundChannelMonitor.rowDataLabel['9'], sortable: true }
      ],
      // data variable : d_s_ = data_string , d_i_ = data_integer ,  d_a_ = data_array , d_o_ = data_object , ,d_b_ = data_boolean
      filterGroupChannel: 'All',
      d_a_dataLists: [],
      d_a_dataChannelName: [],
      d_a_dataGroupChannelName: [],
      d_a_dataChannelCamp: [],
      d_a_dataChannelActivate: [],
      d_a_GroupChannelName: [],
      d_a_RawDataChannel: [],
      d_a_isUserApi: ['channel'],
      d_s_paramBuCode: ''
    }
  },
  components: {
    navBar,
    mainWidget,
    subWidget
  },
  created () {
    if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
      this.d_s_paramBuCode = 'ALL'
    } else {
      this.d_s_paramBuCode = window.top.location.hash.split('/')[2]
    }
    this.d_s_paramBuCode = this.d_s_paramBuCode.toUpperCase()
    this.$root.chkConnectApi('inboundChannel')
    this.setConfig()
    this.getChannelGroup()
  },
  mounted () {
    setInterval(this.renderData, 1000)
  },
  updated () {
  },
  methods: {
    setConfig () {
      this.barColor = 'bg-' + config.configInboundChannel.barColor
      this.isShowMenuBar = config.configInboundChannel.isShowMenuBar
      this.isShowMainWidget = config.configInboundChannel.isShowMainWidget
      this.isShowSubWidget = config.configInboundChannel.isShowSubWidget
    },
    objToObjKey (obj, key) {
      let arr = {}
      Object.keys(obj).map(function (i) {
        const id = obj[i][key]
        arr[id] = obj[i]
      })
      return arr
    },
    renderData () {
      if (this.isBusy === false) {
        if (this.$refs.tableInboundChannel !== undefined) {
          // this.$refs.tableInboundChannel.refresh()
        }
      }
    },
    getChannels (gData) {
      this.d_a_RawDataChannel = gData
      this.getChannelsName()
    },
    onChannels (onData, oldDataRaw) {
      const key = this.d_a_dataLists.findIndex(x => x.name === onData.name)
      const oldData = this.d_a_dataLists[key]
      if (oldData !== undefined) {
        onData.ChannelName = oldData.ChannelName
        onData.GroupChannel = oldData.GroupChannel
        const perHandle = (onData.completed / onData.calls) * 100
        const perAbandoned = (onData.abandoned / onData.calls) * 100
        onData.perHandle = parseFloat(perHandle.toFixed(2))
        onData.perAbandoned = parseFloat(perAbandoned.toFixed(2))
        this.d_a_dataLists[key] = onData
      }
    },
    getChannelsName: async function () {
      const d = await channelOneAppService.get()
      const b = this.objToObjKey(d, 'camp_telephone')
      this.setChannelName(b)
      return b
    },
    getChannelGroup: async function () {
      const d = await channelGroupOneAppService.get()
      const obj = this.objToObjKey(d, 'camp_id')
      const _this = this

      Object.keys(obj).map(function (i) {
        _this.d_a_dataGroupChannelName[i] = obj[i].group_channel_name
      })
      return obj
    },
    setChannelName (obj) {
      const _this = this
      _this.d_a_GroupChannelName.push('All')
      let newArr = []
      let chkCampId = []
      Object.keys(obj).map(function (i) {
        if (buJson[_this.d_s_paramBuCode]['camp_id'].indexOf(parseInt(obj[i]['camp_id'])) > -1) {
          _this.d_a_dataChannelActivate[i] = obj[i].activate
          chkCampId[i] = true
          if (obj[i].channel_name !== '0' && obj[i].channel_name !== 0 && obj[i].channel_name !== undefined && obj[i].channel_name !== '') {
            _this.d_a_dataChannelName[i] = obj[i].channel_name
          } else {
            _this.d_a_dataChannelName[i] = '-'
          }
          if (obj[i].group_channel_name !== '0' && obj[i].group_channel_name !== 0 && obj[i].group_channel_name !== undefined && obj[i].group_channel_name !== '') {
            _this.d_a_dataChannelCamp[i] = obj[i].group_channel_name
            _this.d_a_GroupChannelName.push(obj[i].group_channel_name)
          } else {
            _this.d_a_dataChannelCamp[i] = '-'
          }
        } else {
          chkCampId[i] = false
        }
      })

      Object.keys(_this.d_a_RawDataChannel).map(function (i) {
        if (_this.d_a_dataChannelActivate[_this.d_a_RawDataChannel[i].id] === 1 && chkCampId[_this.d_a_RawDataChannel[i].id] === true) {
          const n = _this.d_a_RawDataChannel[i]
          n.ChannelName = _this.d_a_dataChannelName[i]
          n.GroupChannel = _this.d_a_dataChannelCamp[i]
          if (n.calls !== 0) {
            const perHandle = (n.completed / n.calls) * 100
            const perAbandoned = (n.abandoned / n.calls) * 100
            n.perHandle = parseFloat(perHandle.toFixed(2))
            n.perAbandoned = parseFloat(perAbandoned.toFixed(2))
          } else {
            n.perHandle = 0
            n.perAbandoned = 0
          }
          newArr.push(n)
        }
      })

      _this.d_a_GroupChannelName = this.removeDuplicateUsingFilter(_this.d_a_GroupChannelName)
      _this.d_a_GroupChannelName.push('-')
      this.d_a_dataLists = newArr
      this.isBusy = false
      this.$root.setHeightTable(this.isShowMenuBar, this.isShowMainWidget, this.isShowSubWidget)
    },
    removeDuplicateUsingFilter (arr) {
      let uniArray = arr.filter(function (elem, index, self) {
        return index === self.indexOf(elem)
      })
      return uniArray
    },
    filterDataShow (row, filter) {
      if (this.filterGroupChannel === 'All') {
        return true
      } else if (this.d_a_dataChannelCamp[row.id] === this.filterGroupChannel) {
        return true
      } else {
        return false
      }
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
</style>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
