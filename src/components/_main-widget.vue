<template>
    <div class="mt-3 mb-3 mainWidget">
      <WidgetSets :WidgetSet="d_a_widget" :boxClass="d_s_classColBox" ref="widgetSet"></WidgetSets>
    </div>
</template>
<script>

import config from '../../static/monitor_config/themeConfig.json'
import WidgetSets from './_widgets-set.vue'

export default {
  name: 'mainWidget',
  data () {
    return {
      // data variable : d_s_ = data_string , d_i_ = data_integer ,  d_a_ = data_array , d_o_ = data_object ,d_b_ = data_boolean
      msg: 'mainWidget',
      d_a_config: [],
      d_a_widget: [],
      d_a_dataQueueSummary: [],
      d_a_dataWidget: [],
      d_a_widgetKey: [],
      d_s_classColBox: '',
      d_i_timeInterval: 0,
      d_a_buQueue: []
    }
  },
  components: {
    WidgetSets
  },
  created () {
    this.setConfig()
    this.setWidget()
  },
  mounted () {

  },
  methods: {
    setConfig () {
      let configMW = []
      const keyMenu = this.$route.name.split('-')[0]
      if (config.configMainWidget[keyMenu] === undefined) {
        configMW = config.configMainWidget
      } else {
        configMW = config.configMainWidget[keyMenu]
      }
      if (configMW.NumLoopWidget <= 1) {
        this.d_s_classColBox = 'col-12'
        configMW.NumLoopWidget = 1
      }
      if (configMW.NumLoopWidget === 2) this.d_s_classColBox = 'col-6'
      if (configMW.NumLoopWidget === 3) this.d_s_classColBox = 'col-4'
      if (configMW.NumLoopWidget === 4) this.d_s_classColBox = 'col-3'
      if (configMW.NumLoopWidget === 5) this.d_s_classColBox = 'col-p20 col-sm-2'
      if (configMW.NumLoopWidget >= 5) {
        this.d_s_classColBox = 'col-p20 col-sm-2'
        configMW.NumLoopWidget = 5
      }
      this.d_a_config = configMW
    },
    setWidget () {
      let configMW = this.d_a_config
      const _this = this
      for (let i = 0; i < configMW.NumLoopWidget; i++) {
        let keyWidget = configMW.orderWidget[i]
        if (keyWidget !== undefined) {
        } else {
          keyWidget = 'bankWidget'
        }
        this.$root.chkConnectApi(keyWidget)
        this.d_a_widgetKey[keyWidget] = i
        let classBorderColor = ''
        if (config.widget[keyWidget].widgetBorderColor) {
          classBorderColor = ' border border-' + config.widget[keyWidget].widgetBorderColor
        }
        let classIconColor = ''
        if (config.widget[keyWidget].widgetIconColor) {
          classIconColor = ' text-' + config.widget[keyWidget].widgetIconColor
        }
        let classTextColor = ''
        if (config.widget[keyWidget].widgetTextColor) {
          classTextColor = ' text-' + config.widget[keyWidget].widgetTextColor
        }
        const widget = {
          name: keyWidget,
          class: 'bg-' + config.widget[keyWidget].widgetBgColor + classBorderColor + ' box-main-widget',
          classBody: 'pt-2',
          textColor: classTextColor,
          icon: config.widget[keyWidget].widgetIcon,
          iconColor: classIconColor,
          key: i,
          data: 0,
          text: _this.$root.language.SubWidget[keyWidget],
          digi: config.widget[keyWidget].widgetDigiNumberFormat
        }
        this.d_a_widget.push(widget)
      }
      this.$root.getAllData()
    }
  }
}
</script>
<style>
.col-p20 {
  -webkit-box-flex: 0;
  flex: 0 0 20%;
  max-width: 20%;
}
.box-main-widget{
  height: 122px;
  background-color: #ccc;
}
.box-main-widget .card-title{
  font-size: 1.25rem !important;
}
.box-main-widget .display-icon {
  font-size: 3.5rem !important;
  font-weight: 300;
  line-height: 1.2;
}
.box-main-widget .widget-data{
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
}
</style>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
