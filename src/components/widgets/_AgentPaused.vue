<template>
  <div class="card shadow-sm" :class="this.widget.class">
    <div class="card-body" :class="this.widget.classBody">
      <div class="row align-items-center">
        <div class="col text-right pt-2 pl-0 pr-1">
          <div class="mt-3 pl-2 position-absolute">
            <h2 class="card-title text-uppercase display-icon">
              <IconGoogle :widget="widget" ref="icon"></IconGoogle>
            </h2>
          </div>
          <h6 class="card-title mb-2" :class="this.widget.textColor">
            {{this.widget.text}}
          </h6>
          <h2 class="widget-data mb-0" :class="widget.textColor">
            {{d_i_widgetData | formatWidget(widget.digi)}}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconGoogle from '../_icon_google.vue'
export default {
  name: 'widget-AgentPaused',
  props: ['widget'],
  data () {
    return {
      d_i_widgetData: 0,
      d_b_checkUpdate: undefined,
      d_a_oldDataPaused: []
    }
  },
  components: {
    'IconGoogle': IconGoogle
  },
  methods: {
    get (dataGet) {
      let sumAgentPaused = 0
      Object.keys(dataGet).map(function (key) {
        const extension = dataGet[key]
        if (extension.q_login === true && extension.q_paused === true && extension.q_status === 1) {
          sumAgentPaused = sumAgentPaused + 1
        }
      })
      this.d_i_widgetData = sumAgentPaused
      return this.d_i_widgetData
    },
    on (onData, oldData) {
      const extension = oldData
      let chkUpdate = true
      let valDeff = 0
      if (extension.q_login !== onData.q_login || extension.q_paused !== onData.q_paused || extension.q_status !== onData.q_status) {
        if ((onData.q_login === true && onData.q_paused === true && onData.q_status === 1) && (extension.q_paused !== true || extension.q_status !== 1)) {
          chkUpdate = true
          valDeff = 1
        } else if ((onData.q_login !== true || onData.q_paused !== true || onData.q_status !== 1) && (extension.q_paused === true && extension.q_status === 1)) {
          chkUpdate = false
          valDeff = -1
        }
        this.d_i_widgetData = this.d_i_widgetData + valDeff
        this.d_b_checkUpdate = chkUpdate
      }
      return this.d_i_widgetData
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
