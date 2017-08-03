<template lang="html">
  <div>
    <date-picker 
    :date="startTime" 
    :option="option" 
    :limit="limit"
    :eventbus = "eventbus"
    ></date-picker>
  </div>
</template>

<script>
import myDatepicker from './vue-datepicker/vue-datepicker.vue'
export default {
  props: {
    eventbus: Object
  },
  data () {
    return {
      startTime: {
        time: ''
      },
      endtime: {
        time: ''
      },
      option: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
        placeholder: '设置到期日?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': 'none',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '5px',
          'backgroundColor': 'rgba(97, 172, 152, 0.77)',
          'color': 'white',
          'font-weight': 'bold'
        },
        color: {
          header: 'rgba(97, 172, 152, 0.77)',
          headerText: 'rgba(#87ff00, 0.1)'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5, 0, 6]
      },
      {
        type: 'fromto',
        from: '',
        // 2016-01-20
        to: ''
        // 2016-02-20
      }]
    }
  },
  components: {
    'date-picker': myDatepicker
  },
  watch: {
    startTime: {
      // 返回改变后的到期日
      handler: function (val) {
        if (val.time === '') return
        // 因为打开没有设置条目的 默认清空一下日期 这时候就不用返回了
        this.$emit('senddate', new Date(val.time))
      },
      deep: true
    }
  },
  mounted () {
    this.eventbus.$on('changePicker', function (date) {
      // 根据数据 日期文本框的默认值
      // 因为数据是异步获取的 不能直接props获取
      if (!date) {
        this.startTime.time = ''
        return
      }
      let month = date.getMonth() + 1
      this.startTime.time = date.getFullYear() + '-' + month + '-' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes()
    }.bind(this))
  }
}
</script>

<style lang="css">
</style>
