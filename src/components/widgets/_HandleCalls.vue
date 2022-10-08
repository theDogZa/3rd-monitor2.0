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
  name: 'widget-HandleCalls',
  props: ['widget'],
  data () {
    return {
      d_i_widgetData: 0,
      d_i_sumCalls: 0,
      d_i_sumCompleted: 0,
      d_b_checkUpdate: undefined
    }
  },
  components: {
    'IconGoogle': IconGoogle
  },
  methods: {
    get (dataGet) {
      let sumCalls = 0
      let sumCompleted = 0
      Object.values(dataGet).map(function (queue) {
        sumCalls = sumCalls + queue.calls
        sumCompleted = sumCompleted + queue.completed
      })
      this.d_i_sumCalls = sumCalls
      this.d_i_sumCompleted = sumCompleted
      this.d_i_widgetData = (sumCompleted / sumCalls) * 100

      return this.d_i_widgetData
    },
    on (onData, oldData) {
      const queue = oldData
      if (Object.keys(queue).length > 0) {
        const diffCalls = parseInt(onData.calls) - parseInt(queue.calls)
        const diffCompleted = parseInt(onData.completed) - parseInt(queue.completed)
        this.d_i_sumCalls = this.d_i_sumCalls + diffCalls
        this.d_i_sumCompleted = this.d_i_sumCompleted + diffCompleted
        this.d_i_widgetData = (this.d_i_sumCompleted / this.d_i_sumCalls) * 100
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
