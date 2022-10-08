<template>
  <span>
    <template v-if="this.widget.icon === 'arrow-bottom-left'">
      <span :class="this.widget.iconColor">
        <icon-arrow-bottom-left /></span>
    </template>
    <template v-if="this.widget.icon === 'phone-ring'">
      <span :class="this.widget.iconColor">
        <icon-phone-ring /></span>
    </template>
    <template v-if="this.widget.icon === 'phone-hangup'">
      <span :class="this.widget.iconColor">
        <icon-phone-hangup /></span>
    </template>
    <template v-if="this.widget.icon === 'call-missed'">
      <span :class="this.widget.iconColor">
        <icon-call-missed /></span>
    </template>
    <template v-if="this.widget.icon === 'phone-missed'">
      <span :class="this.widget.iconColor">
        <icon-phone-missed /></span>
    </template>
    <template v-if="this.widget.icon === 'phone-settings'">
      <span :class="this.widget.iconColor">
        <icon-phone-settings /></span>
    </template>
    <template v-if="this.widget.icon === 'phone'">
      <span :class="this.widget.iconColor">
        <icon-phone /></span>
    </template>

    <template v-if="this.widget.icon === 'plus-circle-outline'">
      <span :class="this.widget.iconColor">
        <icon-plus-circle-outline /></span>
    </template>

    <template v-if="this.widget.icon === 'minus-circle-outline'">
      <span :class="this.widget.iconColor">
        <icon-minus-circle-outline /></span>
    </template>
  </span>
</template>
<script>

import dotsHorizontal from 'vue-material-design-icons/dotsHorizontal.vue'
import circle from 'vue-material-design-icons/circle.vue'
import account from 'vue-material-design-icons/account.vue'
import gauge from 'vue-material-design-icons/gauge.vue'
import ArrowBottomLeft from 'vue-material-design-icons/ArrowBottomLeft.vue'
import PhoneRing from 'vue-material-design-icons/PhoneRing.vue'
import PhoneHangup from 'vue-material-design-icons/PhoneHangup.vue'
import CallMissed from 'vue-material-design-icons/CallMissed.vue'
import PhoneMissed from 'vue-material-design-icons/PhoneMissed.vue'
import PhoneSettings from 'vue-material-design-icons/PhoneSettings.vue'
import Phone from 'vue-material-design-icons/Phone.vue'
import PlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'
import MinusCircleOutline from 'vue-material-design-icons/MinusCircleOutline.vue'

export default {
  name: 'icon',
  props: ['widget'],
  data () {
    return {

    }
  },
  components: {
    'IconDotsHorizontal': dotsHorizontal,
    'IconCircle': circle,
    'IconAccount': account,
    'IconGauge': gauge,
    'IconArrowBottomLeft': ArrowBottomLeft,
    'IconPhoneRing': PhoneRing,
    'IconPhoneHangup': PhoneHangup,
    'IconCallMissed': CallMissed,
    'IconPhoneMissed': PhoneMissed,
    'IconPhoneSettings': PhoneSettings,
    'IconPhone': Phone,
    'IconPlusCircleOutline': PlusCircleOutline,
    'IconMinusCircleOutline': MinusCircleOutline
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}

</script>
<!-- note update
// app_name => monitor 2.0
// app_version => V1.0.0
// last update => 2020-01-06 17:00
// last update by => prasong.pu
-->
