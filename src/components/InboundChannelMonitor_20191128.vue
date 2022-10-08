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
                <b-form-select v-model="filterGroupChannel" id="selectGroupChannel" size="sm" :options="arrGroupChannelName"></b-form-select>
              </b-form-group>
            </div>
          </div>
        </div>
        <br>
      </div>
      <b-table id="table-transition" sticky-header :items="dataLists" :fields="fields" :busy.sync="isBusy"
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" striped small hover :tbody-transition-props="transProps"
        :filter-function="filterDataShow" :filter="isShow" ref="tableInboundChannel">
         <template v-slot:cell(GroupChannel)="d">
          {{ dataChannelCamp[d.item.id] }}
        </template>
        <template v-slot:cell(ChannelName)="d">
          {{ dataChannelName[d.item.id] }}
        </template>
         <template v-slot:cell(calls)="d">
          {{ dataChannel[d.item.id]['calls'] }}
        </template>
        <template v-slot:cell(perHandle)="d">
          {{ dataChannel[d.item.id]['perHandle'] | formatPer }}
        </template>
        <template v-slot:cell(perAbandoned)="d">
          {{ dataChannel[d.item.id]['perAbandoned'] | formatPer }}
        </template>
      </b-table>
  </div>
</template>

<script>
// import ChannelName from '../assets/config/ChannelName.json'
import channelService from '../services/ChannelService'
import channelOneAppService from '../services/ChannelOneAppService'
import channelGroupOneAppService from '../services/ChannelGroupOneAppService'
import navBar from './_nav-bar.vue'
import mainWidget from './_main-widget.vue'
import subWidget from './_sub-widget.vue'
import { configInboundChannel } from '@/../themeConfig.js'
import buJson from '../assets/config/Bu.json'

export default {
  name: 'InboundChannelMonitor',
  data () {
    return {
      headTitle: this.$root.language.InboundChannelMonitor.headTitle,
      title: this.$root.language.InboundChannelMonitor.title,
      barColor: '',
      sortBy: 'name',
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
      filterGroupChannel: 'All',
      dataLists: [],
      dataChannel: [],
      dataChannelName: [],
      dataGroupChannelName: [],
      dataChannelCamp: [],
      dataChannelActivate: [],
      arrGroupChannelName: [],
      paramBuCode: ''
    }
  },
  components: {
    navBar,
    mainWidget,
    subWidget
  },
  created () {
    if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
      this.paramBuCode = 'ALL'
    } else {
      this.paramBuCode = window.top.location.hash.split('/')[2]
    }
    this.setConfig()
    this.getChannelGroup()
    this.getChannels()
  },
  mounted () {
    // this.onChannels()
    setInterval(this.renderData, 1000)
  },
  updated () {
  },
  methods: {
    setConfig () {
      this.barColor = 'bg-' + configInboundChannel.barColor
      this.isShowMenuBar = configInboundChannel.isShowMenuBar
      this.isShowMainWidget = configInboundChannel.isShowMainWidget
      this.isShowSubWidget = configInboundChannel.isShowSubWidget
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
          this.$refs.tableInboundChannel.refresh()
        } else {
          console.log('not refresh')
        }
      }
    },
    getChannelsName: async function () {
      const d = await channelOneAppService.get()
      // this.dataLists = d
      const b = this.objToObjKey(d, 'camp_telephone')
      this.setChannelName(b)
      return b
    },
    getChannelGroup: async function () {
      const d = await channelGroupOneAppService.get()
      const obj = this.objToObjKey(d, 'camp_id')
      const _this = this

      Object.keys(obj).map(function (i) {
        _this.dataGroupChannelName[i] = obj[i].group_channel_name
      })
      return obj
    },
    getChannels: async function () {
      const d = await channelService.get()
      this.dataLists = d
      this.dataChannel = this.objToArrayKey(d, 'id')
      this.getChannelsName()
      this.onChannels()
    },
    onChannels: async function () {
      const _this = this
      channelService.connect.on(channelService.pathOn, function (d) {
        // this.dataLists = d.data
        // console.log('=============onChannels==========', d.data.id, d.data.calls)
        if (_this.dataChannel[d.data.id] === undefined) {
          _this.dataChannel[d.data.id] = []
          _this.dataLists.push(d.data)
        }
        _this.dataChannel[d.data.id]['calls'] = d.data.calls
        _this.dataChannel[d.data.id]['wait'] = d.data.wait
        _this.dataChannel[d.data.id]['completed'] = d.data.completed
        _this.dataChannel[d.data.id]['abandoned'] = d.data.abandoned
        if (d.data.calls !== 0) {
          _this.dataChannel[d.data.id]['perHandle'] = (d.data.completed / d.data.calls) * 100
          _this.dataChannel[d.data.id]['perAbandoned'] = (d.data.abandoned / d.data.calls) * 100
        } else {
          _this.dataChannel[d.data.id]['perHandle'] = 0
          _this.dataChannel[d.data.id]['perAbandoned'] = 0
        }
      })
    },
    setChannelName (obj) {
      const _this = this
      _this.arrGroupChannelName.push('All')
      let newArr = []
      let chkCampId = []
      // console.log('paramBuCode-------------------------------', buJson[_this.paramBuCode]['camp_id'])
      Object.keys(obj).map(function (i) {
        // console.log('---camp_id------', buJson[_this.paramBuCode]['camp_id'].indexOf(parseInt(obj[i]['camp_id'])))
        if (buJson[_this.paramBuCode]['camp_id'].indexOf(parseInt(obj[i]['camp_id'])) > -1) {
          _this.dataChannelActivate[i] = obj[i].activate
          chkCampId[i] = true
          if (obj[i].channel_name !== '0' && obj[i].channel_name !== 0 && obj[i].channel_name !== undefined && obj[i].channel_name !== '') {
            _this.dataChannelName[i] = obj[i].channel_name + '-----' + obj[i].camp_id
          } else {
            _this.dataChannelName[i] = '-'
          }
          if (obj[i].group_channel_name !== '0' && obj[i].group_channel_name !== 0 && obj[i].group_channel_name !== undefined && obj[i].group_channel_name !== '') {
            _this.dataChannelCamp[i] = obj[i].group_channel_name
            _this.arrGroupChannelName.push(obj[i].group_channel_name)
          } else {
            _this.dataChannelCamp[i] = '-'
          }
        } else {
          chkCampId[i] = false
        }
      })
      _this.arrGroupChannelName = this.removeDuplicateUsingFilter(_this.arrGroupChannelName)
      _this.arrGroupChannelName.push('-')
      Object.keys(_this.dataLists).map(function (i) {
        // console.log('---------', i, _this.dataChannelActivate[_this.dataLists[i].id], chkCampId[_this.dataLists[i].id])
        if (_this.dataChannelActivate[_this.dataLists[i].id] === 1 && chkCampId[_this.dataLists[i].id] === true) {
          // console.log('true-----------', _this.dataChannelActivate[_this.dataLists[i].id], chkCampId[_this.dataLists[i].id])
          const n = _this.dataLists[i]
          newArr.push(n)
        } else {
          // console.log('no-----------', _this.dataChannelActivate[_this.dataLists[i].id], chkCampId[_this.dataLists[i].id])
        }
      })
      // console.log('---sdsd----', _this.dataChannelCamp)
      this.dataLists = newArr
      this.isBusy = false
    },
    removeDuplicateUsingFilter (arr) {
      // console.log('---------', arr)
      let uniArray = arr.filter(function (elem, index, self) {
        return index === self.indexOf(elem)
      })
      return uniArray
    },
    filterDataShow (row, filter) {
      // console.log('row--', row)
      if (this.filterGroupChannel === 'All') {
        return true
      } else if (this.dataChannelCamp[row.id] === this.filterGroupChannel) {
        return true
      } else {
        return false
      }
    },
    objToArrayKey (obj, key) {
      const newArr = []
      const _this = this
      obj.forEach(function (v, i) {
        if (buJson[_this.paramBuCode]['camp_id'].indexOf(parseInt(v.camp_id)) > -5) {
          newArr[v[key]] = v
          newArr[v[key]]['calls'] = v.calls
          newArr[v[key]]['wait'] = v.wait
          newArr[v[key]]['completed'] = v.completed
          newArr[v[key]]['abandoned'] = v.abandoned
          if (v.calls !== 0) {
            newArr[v[key]]['perHandle'] = (v.completed / v.calls) * 100
            newArr[v[key]]['perAbandoned'] = (v.abandoned / v.calls) * 100
          } else {
            newArr[v[key]]['perHandle'] = 0
            newArr[v[key]]['perAbandoned'] = 0
          }
        }
      })
      return newArr
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
  max-height: 600px;
  font-size: 0.8rem !important;
}
</style>
