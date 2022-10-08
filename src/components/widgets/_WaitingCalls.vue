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
  name: 'widget-Waitingcalls',
  props: ['widget'],
  data () {
    return {
      d_i_widgetData: 0,
      d_i_sumCalls: 0,
      d_b_checkUpdate: undefined
    }
  },
  components: {
    'IconGoogle': IconGoogle
  },
  methods: {
    get (dataGet) {
      let sumWaits = 0
      Object.values(dataGet).map(function (queue) {
        sumWaits = sumWaits + queue.wait
      })
      this.d_i_sumWaits = sumWaits
      this.d_i_widgetData = sumWaits

      return this.d_i_widgetData
    },
    on (onData, oldData) {
      const queue = oldData
      if (queue !== undefined) {
        let sumWaits = this.d_i_sumCalls
        if (onData.wait > parseInt(queue.wait)) {
          sumWaits = parseInt(sumWaits) + (parseInt(onData.wait) - parseInt(queue.wait))
        } else if (onData.wait < parseInt(queue.wait)) {
          sumWaits = parseInt(sumWaits) - (parseInt(queue.wait) - parseInt(onData.wait))
        } else if (onData.wait === 0) {
          if (parseInt(sumWaits) >= parseInt(queue.wait)) {
            sumWaits = parseInt(sumWaits) - parseInt(queue.wait)
          } else {
            sumWaits = 0
          }
        }
        if (sumWaits < 0) sumWaits = 0
        this.d_i_sumCalls = sumWaits
        this.d_i_widgetData = sumWaits
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
