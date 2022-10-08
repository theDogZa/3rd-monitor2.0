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
  name: 'widget-AvgTalkTime',
  props: ['widget'],
  data () {
    return {
      d_i_widgetData: 0,
      d_i_sumTtalktime: 0,
      d_i_sumCompleted: 0,
      d_b_checkUpdate: undefined
    }
  },
  components: {
    'IconGoogle': IconGoogle
  },
  created () {

  },
  mounted () {

  },
  methods: {
    get (dataGet) {
      let sumTalktime = 0
      let sumCompleted = 0
      Object.values(dataGet).map(function (queue) {
        sumTalktime = sumTalktime + queue.talktime
        sumCompleted = sumCompleted + queue.completed
      })
      this.d_i_sumTtalktime = sumTalktime
      this.d_i_sumCompleted = sumCompleted
      this.d_i_widgetData = (sumTalktime / sumCompleted)
    },
    on (onData, oldData) {
      const queue = oldData
      if (Object.keys(queue).length > 0) {
        const diffTalktime = parseInt(onData.talktime) - parseInt(queue.talktime)
        const diffCompleted = parseInt(onData.completed) - parseInt(queue.completed)
        this.d_i_sumTtalktime = this.d_i_sumTtalktime + diffTalktime
        this.d_i_sumCompleted = this.d_i_sumCompleted + diffCompleted
        this.d_i_widgetData = (this.d_i_sumTtalktime / this.d_i_sumCompleted)
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
