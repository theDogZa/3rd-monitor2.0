<template>
  <div class="row">
    <div v-for="(widget, index) in this.WidgetSet" :key="index" class="col pl-2 pr-2">
      <widgetOfferedCalls v-if="widget.name === 'OfferedCalls'" :widget="widget" ref="OfferedCalls">
      </widgetOfferedCalls>
      <widgetWaitingCalls v-if="widget.name === 'WaitingCalls'" :widget="widget" ref="WaitingCalls">
      </widgetWaitingCalls>
      <widgetAnsweredCalls v-if="widget.name === 'AnsweredCalls'" :widget="widget" ref="AnsweredCalls">
      </widgetAnsweredCalls>
      <widgetAbandonedCalls v-if="widget.name === 'AbandonedCalls'" :widget="widget" ref="AbandonedCalls">
      </widgetAbandonedCalls>
      <widgetPerAbandonedCalls v-if="widget.name === 'PerAbandonedCalls'" :widget="widget" ref="PerAbandonedCalls">
      </widgetPerAbandonedCalls>
      <widgetAgentReadyInQueue v-if="widget.name === 'AgentReadyInQueue'" :widget="widget" ref="AgentReadyInQueue">
      </widgetAgentReadyInQueue>
      <template v-if="widget.name === 'AgentInUsed'">
        <widgetAgentInUsed :widget="widget" :ref="widget.name"></widgetAgentInUsed>
      </template>
      <template v-if="widget.name === 'AgentOnHold'">
        <widgetAgentOnHold :widget="widget" :ref="widget.name"></widgetAgentOnHold>
      </template>
      <template v-if="widget.name === 'AgentPaused'">
        <widgetAgentPaused :widget="widget" :ref="widget.name"></widgetAgentPaused>
      </template>
      <template v-if="widget.name === 'HandleCalls'">
        <widgetHandleCalls :widget="widget" :ref="widget.name"></widgetHandleCalls>
      </template>
      <template v-if="widget.name === 'MissedCalls'">
        <widgetMissedCalls :widget="widget" :ref="widget.name"></widgetMissedCalls>
      </template>
      <template v-if="widget.name === 'AvgTalkTime'">
        <widgetAvgTalkTime :widget="widget" :ref="widget.name"></widgetAvgTalkTime>
      </template>
      <template v-if="widget.name === 'bankWidget'">
        <widgetBankWidget :widget="widget" :ref="widget.name"></widgetBankWidget>
      </template>

      <template v-if="widget.name === 'tempWidget'">
        <widgetTempWidget :widget="widget" :ref="widget.name"></widgetTempWidget>
      </template>
    </div>
  </div>
</template>
<script>
import widgetBankWidget from './widgets/_BankWidget.vue'
import widgetTempWidget from './widgets/_tempWidget.vue'
import widgetOfferedCalls from './widgets/_OfferedCalls.vue'
import widgetWaitingCalls from './widgets/_WaitingCalls.vue'
import widgetAnsweredCalls from './widgets/_AnsweredCalls.vue'
import widgetAbandonedCalls from './widgets/_AbandonedCalls.vue'
import widgetPerAbandonedCalls from './widgets/_PerAbandonedCalls.vue'
import widgetMissedCalls from './widgets/_MissedCalls.vue'
import widgetAgentReadyInQueue from './widgets/_AgentReadyInQueue.vue'
import widgetAgentInUsed from './widgets/_AgentInUsed.vue'
import widgetAgentOnHold from './widgets/_AgentOnHold.vue'
import widgetAgentPaused from './widgets/_AgentPaused.vue'
import widgetHandleCalls from './widgets/_HandleCalls.vue'
import widgetAvgTalkTime from './widgets/_AvgTalkTime.vue'

export default {
  name: 'widget-set',
  props: ['WidgetSet', 'boxClass'],
  data () {
    return {
      d_a_oldExtensions: [],
      d_a_oldQueues: [],
      d_a_oldInstatQueue: []
    }
  },
  components: {
    widgetBankWidget,
    widgetTempWidget,
    widgetOfferedCalls,
    widgetWaitingCalls,
    widgetAnsweredCalls,
    widgetAbandonedCalls,
    widgetPerAbandonedCalls,
    widgetMissedCalls,
    widgetAgentReadyInQueue,
    widgetAgentInUsed,
    widgetAgentOnHold,
    widgetAgentPaused,
    widgetHandleCalls,
    widgetAvgTalkTime
  },
  methods: {
    sentDataToWidget: async function (api, type, oldData, onData) {
      const _this = this
      Object.values(this.WidgetSet).map(function (widget) {
        if (api === 'extensions') {
          if (widget.name === 'AgentReadyInQueue') {
            if (type === 'get') {
              _this.$refs.AgentReadyInQueue[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AgentReadyInQueue[0].on(onData, oldData)
            }
          }
          if (widget.name === 'AgentInUsed') {
            if (type === 'get') {
              _this.$refs.AgentInUsed[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AgentInUsed[0].on(onData, oldData)
            }
          }
          if (widget.name === 'AgentOnHold') {
            if (type === 'get') {
              _this.$refs.AgentOnHold[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AgentOnHold[0].on(onData, oldData)
            }
          }
          if (widget.name === 'AgentPaused') {
            if (type === 'get') {
              _this.$refs.AgentPaused[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AgentPaused[0].on(onData, oldData)
            }
          }
          if (widget.name === 'tempWidget') {
            if (type === 'get') {
              _this.$refs.tempWidget[0].getExtensions(oldData)
            } else if (type === 'on') {
              _this.$refs.tempWidget[0].onExtensions(onData, oldData)
            }
          }
        } else if (api === 'queues') {
          if (widget.name === 'OfferedCalls') {
            if (type === 'get') {
              _this.$refs.OfferedCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.OfferedCalls[0].on(onData, oldData)
            }
          }
          if (widget.name === 'WaitingCalls') {
            if (type === 'get') {
              _this.$refs.WaitingCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.WaitingCalls[0].on(onData, oldData)
            }
          }
          if (widget.name === 'AnsweredCalls') {
            if (type === 'get') {
              _this.$refs.AnsweredCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AnsweredCalls[0].on(onData, oldData)
            }
          }
          if (widget.name === 'AbandonedCalls') {
            if (type === 'get') {
              _this.$refs.AbandonedCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AbandonedCalls[0].on(onData, oldData)
            }
          }
          if (widget.name === 'PerAbandonedCalls') {
            if (type === 'get') {
              _this.$refs.PerAbandonedCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.PerAbandonedCalls[0].on(onData, oldData)
            }
          }
          if (widget.name === 'HandleCalls') {
            if (type === 'get') {
              _this.$refs.HandleCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.HandleCalls[0].on(onData, oldData)
            }
          }
          if (widget.name === 'AvgTalkTime') {
            if (type === 'get') {
              _this.$refs.AvgTalkTime[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.AvgTalkTime[0].on(onData, oldData)
            }
          }
          if (widget.name === 'tempWidget') {
            if (type === 'get') {
              _this.$refs.tempWidget[0].getQueues(oldData)
            } else if (type === 'on') {
              _this.$refs.tempWidget[0].onQueues(onData, oldData)
            }
          }
        } else if (api === 'instatqueue') {
          if (widget.name === 'MissedCalls') {
            if (type === 'get') {
              _this.$refs.MissedCalls[0].get(oldData)
            } else if (type === 'on') {
              _this.$refs.MissedCalls[0].on(onData, oldData)
            }
          }

          if (widget.name === 'tempWidget') {
            if (type === 'get') {
              _this.$refs.tempWidget[0].getInstatqueue(oldData)
            } else if (type === 'on') {
              _this.$refs.tempWidget[0].onInstatqueue(onData, oldData)
            }
          }
        }
      })
    },
    getExtensions (dExtensions) {
      this.d_a_oldExtensions = dExtensions
      this.sentDataToWidget('extensions', 'get', dExtensions, '')
      return dExtensions
    },
    onExtensions (onData, oldData) {
      const oldExtensions = Object.assign({}, oldData[onData.id])
      this.sentDataToWidget('extensions', 'on', oldExtensions, onData)
    },
    getQueues (dQueues) {
      this.d_a_oldQueues = dQueues
      this.sentDataToWidget('queues', 'get', dQueues, '')
    },
    onQueues (onData, oldData) {
      const oldQueues = Object.assign({}, oldData[onData.id])
      this.sentDataToWidget('queues', 'on', oldQueues, onData)
    },
    getInstatqueue (dInstatQueue) {
      this.d_a_oldInstatQueue = dInstatQueue
      this.sentDataToWidget('instatqueue', 'get', dInstatQueue, '')
    },
    onInstatqueue (onData, oldData) {
      const oldInstatQueue = Object.assign({}, oldData[onData.id])
      this.sentDataToWidget('instatqueue', 'on', oldInstatQueue, onData)
    }
  }
}
</script>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
