import Vue from 'vue'
import Router from 'vue-router'
import moment from 'moment'
// import InboundAgentMonitor from '@/components/InboundAgentMonitor'
// import InboundChannelMonitor from '@/components/InboundChannelMonitor'
// import InboundQueueMonitor from '@/components/InboundQueueMonitor'

const InboundAgentMonitor = () => import('@/components/InboundAgentMonitor')
const InboundChannelMonitor = () => import('@/components/InboundChannelMonitor')
const InboundQueueMonitor = () => import('@/components/InboundQueueMonitor')

Vue.filter('DiffTimeNow', function (dt) {
  if (dt) {
    let dta = moment(dt).toArray()
    let a = moment()
    let b = moment(dta)
    return moment.utc(a.diff(b)).format('HH:mm:ss')
  }
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
  }
})
Vue.filter('formatWidget', function (num, f) {
  if (f === 't') {
    return moment.utc(num * 1000).format('HH:mm:ss')
  } else if (f !== 2) {
    let val = (num / 1).toFixed(f)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    let val = parseFloat(num.toFixed(2))
    return val
  }
})

Vue.filter('formatNumber', function (num, f) {
  if (f !== 2) {
    let val = (num / 1).toFixed(f)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    let val = parseFloat(num.toFixed(2))
    return val
  }
})

Vue.filter('formatPer', function (num) {
  let val = 0
  if (num) {
    val = parseFloat(num.toFixed(2))
  }
  return val
})
Vue.filter('millisecondsToTime', function (mls) {
  if (mls) {
    return moment.utc(mls * 1000).format('HH:mm:ss')
  } else {
    return '00:00:00'
  }
})

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: InboundChannelMonitor
    },
    {
      path: '/inbound-agent',
      name: 'inboundAgent',
      component: InboundAgentMonitor
    },
    {
      path: '/inbound-agent/:BuCode',
      name: 'inboundAgent-Param',
      component: InboundAgentMonitor
    },
    {
      path: '/inbound-channel',
      name: 'inboundChannel',
      component: InboundChannelMonitor
    },
    {
      path: '/inbound-channel/:BuCode',
      name: 'inboundChannel-Param',
      component: InboundChannelMonitor
    },
    {
      path: '/inbound-queue',
      name: 'inboundQueue',
      component: InboundQueueMonitor
    },
    {
      path: '/inbound-queue/:BuCode',
      name: 'inboundQueue-Param',
      component: InboundQueueMonitor
    }
  ]
})
// ------ note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
