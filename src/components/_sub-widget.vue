<template>
  <div class="mt-3 mb-3 subWidget">
    <WidgetSets :WidgetSet="d_a_widget" :boxClass="d_s_classColBox" ref="widgetSet"></WidgetSets>
  </div>
</template>
<script>

import config from '../../static/monitor_config/themeConfig.json'
import WidgetSets from './_widgets-set.vue'
export default {
  name: 'subWidget',
  data () {
    return {
      // data variable : d_s_ = data_string , d_i_ = data_integer ,  d_a_ = data_array , d_o_ = data_object ,d_b_ = data_boolean
      msg: 'subWidget',
      d_a_config: [],
      d_a_widget: [],
      d_a_widgetKey: [],
      d_s_classColBox: ''
    }
  },
  components: {
    WidgetSets
  },
  created () {
    this.setConfig()
    this.setWidget()
  },
  methods: {
    setConfig () {
      let configMW = []
      const keyMenu = this.$route.name.split('-')[0]
      if (config.configSubWidget[keyMenu] === undefined) {
        configMW = config.configSubWidget
      } else {
        configMW = config.configSubWidget[keyMenu]
      }
      if (configMW.numLoopWidget <= 1) {
        this.d_s_classColBox = 'col-12'
        configMW.NumLoopWidget = 1
      }
      if (configMW.NumLoopWidget === 2) this.d_s_classColBox = 'col-6'
      if (configMW.NumLoopWidget === 3) this.d_s_classColBox = 'col-4'
      if (configMW.NumLoopWidget === 4) this.d_s_classColBox = 'col-3'
      if (configMW.NumLoopWidget === 5) this.d_s_classColBox = 'col-p20'
      if (configMW.NumLoopWidget === 6) this.d_s_classColBox = 'col-2'
      if (configMW.NumLoopWidget >= 7) {
        this.d_s_classColBox = 'col-p14-2857'
        configMW.NumLoopWidget = 7
      }
      this.d_a_config = configMW
    },
    setWidget () {
      let configMW = this.d_a_config
      const _this = this
      for (let i = 0; i < configMW.numLoopWidget; i++) {
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
          class: 'bg-' + config.widget[keyWidget].widgetBgColor + classBorderColor + ' box-sub-widget',
          classBody: 'pt-0',
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
.col-p14-2857 {
    -webkit-box-flex: 0;
    flex: 0 0 14.2857%;
    max-width: 14.2857%;
}
.box-sub-widget{
    height: 80px;
    background-color: #fff;
    border: 1px solid #CCC;
}
.box-sub-widget h6{
   font-size: 1vw;
}
.box-sub-widget .display-icon {
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 1;
}
.box-sub-widget .widget-data{
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
}
</style>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
