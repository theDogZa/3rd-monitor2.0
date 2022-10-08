<template>
  <div class="card shadow-sm h-100" :class="widget.class">
    <div class="card-body pt-0">
      <div class="row align-items-center">
        <div class="col-auto mt-2 pr-1 pl-3">
          <h2 class="card-title text-uppercase display-5"></h2>
        </div>
        <div class="col text-right pt-2 pl-0 pr-1">
          <h6 class="card-title mb-2" :class="this.widget.textColor">
            {{this.widget.text}}
          </h6>
          <h2 class="mb-0" :class="widget.textColor"></h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'widget-Bank',
  props: ['widget'],
  data () {
    return {
      d_i_widgetData: '',
      d_b_checkUpdate: undefined
    }
  },
  created () {

  },
  mounted () {

  },
  updated () {
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
