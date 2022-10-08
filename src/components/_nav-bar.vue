<template>
  <div class="row mb-3 border-bottom" :class="d_s_barColor">
    <div class="col-8 text-left pt-3">
      <h1>
        <span :class="d_s_iconMonitorColor">
          <icon-gauge /></span>
        {{this.title}}
        <span :class="d_s_iconUserOnlineColor">
          <icon-account /></span> ({{d_i_sumUserOnline}})
        <span :class="d_s_iconUserOfflineColor">
          <icon-account /></span> ({{d_i_sumUserOffline}})
      </h1>
    </div>
    <div class="col float-right pt-4">
      <div class="mr-2 float-right" v-if="d_b_btnMenuIsUser === true">
        <b-dropdown right :variant="d_s_btnMenuColor" toggle-class="text-decoration-none btn-menu" no-caret>
          <template v-slot:button-content>
            <span class="ico-menu-size p-0">
              <icon-dots-horizontal /></span>
          </template>
          <b-dropdown-item-button v-for="menu in d_a_menuList" :key="menu.key" @click="changePage(menu.url)">
            <template v-if="menu.isUse === true">{{ d_a_menuName[menu.key] }}</template>
          </b-dropdown-item-button>
          <!-- <router-link  :to="{name:'inboundAgentParam', params: {  BuCode:'DRTVTVS' }}" >inboundAgent</router-link>
              <router-link :to="{name:'inboundQueueParam', params: {  BuCode:'DRTVTVS' }}" >inboundQueue</router-link> -->
        </b-dropdown>
      </div>
      <div class="float-right mr-2">
        <div v-if="!d_b_isConnecting" class="float-right">
          <h4 :class="d_s_textConnectedOfflineColor">
            <icon-circle /> {{d_s_notConnected}}</h4>
        </div>
        <div v-if="d_b_isConnecting" class="float-right">
          <h4 :class="d_s_textConnectedOnlineColor">
            <icon-circle /> {{d_s_realTimeConnected}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {themeConfig} from '@/../themeConfig.js'
import config from '../../static/monitor_config/themeConfig.json'
import dotsHorizontal from 'vue-material-design-icons/dotsHorizontal.vue'
import circle from 'vue-material-design-icons/circle.vue'
import account from 'vue-material-design-icons/account.vue'
import gauge from 'vue-material-design-icons/gauge.vue'

export default {
  name: 'navBar',
  props: ['title'],
  data () {
    return {
      // data variable : d_s_ = data_string , d_i_ = data_integer ,  d_a_ = data_array , d_o_ = data_object ,d_b_ = data_boolean
      msg: '',
      d_s_notConnected: '',
      d_s_realTimeConnected: '',
      d_a_menuName: [],
      d_a_menuList: [],
      d_b_isConnecting: false,
      d_a_ExtensionConnect: {},
      d_i_sumUserOnline: 0,
      d_i_sumUserOffline: 0,
      d_s_barColor: '',
      d_s_btnMenuColor: 'bg-light',
      d_s_iconMonitorColor: '',
      d_s_iconUserOnlineColor: 'text-success',
      d_s_iconUserOfflineColor: 'text-danger',
      d_b_btnMenuIsUser: true,
      d_s_textConnectedOnlineColor: 'text-success',
      d_s_textConnectedOfflineColor: 'text-danger'
    }
  },
  components: {
    'IconDotsHorizontal': dotsHorizontal,
    'IconCircle': circle,
    'IconAccount': account,
    'IconGauge': gauge
  },
  created () {
    if (window.top.location.hash.split('/')[2] === undefined || window.top.location.hash.split('/')[2] === '') {
      this.d_s_paramBuCode = 'ALL'
    } else {
      this.d_s_paramBuCode = window.top.location.hash.split('/')[2]
    }
    this.d_s_paramBuCode = this.d_s_paramBuCode.toUpperCase()
    this.setLanguage()
    this.setConfig()
    this.$root.chkConnectApi('navBar')
  },
  mounted () {

  },
  methods: {
    changePage (name) {
      let param = ''
      // if (this.d_s_paramBuCode !== 'ALL') {
      param = '/' + this.d_s_paramBuCode
      // }
      let urlb = window.location.href.split('#')[0]
      window.location.href = urlb + name + param
      setTimeout(function () { window.location.reload() }, 500)
    },
    setLanguage () {
      this.d_s_notConnected = this.$root.language.MenuBar.noConnecting
      this.d_s_realTimeConnected = this.$root.language.MenuBar.Connecting
      this.d_a_menuName = this.$root.language.MenuBar.menuList
    },
    setConfig () {
      this.d_a_menuList = themeConfig.menuList
      if (config.configNavBar.barColor) {
        this.d_s_barColor = 'bg-' + config.configNavBar.barColor
      }
      if (config.configNavBar.btnMenuColor) {
        this.d_s_btnMenuColor = config.configNavBar.btnMenuColor
      }
      if (config.configNavBar.iconMonitorColor) {
        this.d_s_iconMonitorColor = 'text-' + config.configNavBar.iconMonitorColor
      }
      if (config.configNavBar.iconUserOnlineColor) {
        this.d_s_iconUserOnlineColor = 'text-' + config.configNavBar.iconUserOnlineColor
      }
      if (config.configNavBar.iconUserOfflineColor) {
        this.d_s_iconUserOfflineColor = 'text-' + config.configNavBar.iconUserOfflineColor
      }
      if (config.configNavBar.textConnectedOnlineColor) {
        this.d_s_textConnectedOnlineColor = 'text-' + config.configNavBar.textConnectedOnlineColor
      }
      if (config.configNavBar.textConnectedOfflineColor) {
        this.d_s_textConnectedOfflineColor = 'text-' + config.configNavBar.textConnectedOfflineColor
      }
      if (config.configNavBar.btnMenuIsUser !== undefined) {
        this.d_b_btnMenuIsUser = config.configNavBar.btnMenuIsUser
      }
      this.$root.menuKey = this.$router.currentRoute.name
    },
    getExtensions (dExtensions) {
      this.setSumUserOnlineOffline(dExtensions)
    },
    onExtensions (onData, oldData) {
      const c = this.checkConnectStatus(onData)
      if (this.d_a_ExtensionConnect[onData.id] !== c) {
        if (c === true) {
          this.d_i_sumUserOnline = this.d_i_sumUserOnline + 1
          this.d_i_sumUserOffline = this.d_i_sumUserOffline - 1
        } else {
          this.d_i_sumUserOffline = this.d_i_sumUserOffline + 1
          this.d_i_sumUserOnline = this.d_i_sumUserOnline - 1
        }
        this.d_a_ExtensionConnect[onData.id] = c
      }
    },
    setSumUserOnlineOffline (dExtensions) {
      const _this = this
      Object.values(dExtensions).map(async function (v, k) {
        const c = _this.checkConnectStatus(v)
        if (c === true) {
          _this.d_i_sumUserOnline = _this.d_i_sumUserOnline + 1
        } else {
          _this.d_i_sumUserOffline = _this.d_i_sumUserOffline + 1
        }
        _this.d_a_ExtensionConnect[v.id] = c
      })
    },
    setConnected (c) {
      this.d_b_isConnecting = c
    },
    checkConnectStatus (v) {
      const s = v.q_status
      const l = v.q_login
      const p = v.q_paused
      const es = v.exstatus

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
<style scoped>
.ico-menu-size{
  font-size: 2rem;
  line-height: 0;
}
</style>
<style>
.dropdown-item:hover{
  background:#007bff !important;
  color: #fff !important;
}
.btn-menu{
  padding: 0rem 0.5rem !important;
  border: 1px solid#ccc;
  margin-top: -5px;
}
</style>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
