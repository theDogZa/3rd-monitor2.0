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
  name: 'widget-MissedCalls',
  props: ['widget'],
  data () {
    return {
      d_i_widgetData: 0,
      d_i_sumMissedCalls: 0
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
      let sumMissedCalls = 0
      Object.values(dataGet).map(function (instatqueue) {
        if (instatqueue.misscall !== undefined) {
          sumMissedCalls = sumMissedCalls + instatqueue.misscall
        }
      })
      this.d_i_sumMissedCalls = sumMissedCalls
      this.d_i_widgetData = sumMissedCalls

      return this.d_i_widgetData
    },
    on (onData, oldData) {
      const instatqueue = oldData
      if (instatqueue !== undefined) {
        if (onData.misscall !== undefined && instatqueue.misscall !== undefined) {
          const diffMisscall = parseInt(onData.misscall) - parseInt(instatqueue.misscall)
          this.d_i_sumMissedCalls = parseInt(this.d_i_sumMissedCalls) + parseInt(diffMisscall)
          this.d_i_widgetData = this.d_i_sumMissedCalls
        }
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
