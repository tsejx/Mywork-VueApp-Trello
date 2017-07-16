<template>
  <div id="label-wrap">
    <div class="label-show">
      <button class="ui icon button" @click.stop = "showPicker = ! showPicker">
        <i class="icon add"></i>
      </button>
      <a class="ui mini red tag label" v-for = "val,key in labelData"   :class="val.color" v-if = "val.picked">{{val.text}}</a>
    </div>
    <div class="label-pick" v-show = "showPicker">
      <div class="label-head">
        <h3>标签</h3>
        <button class="close-label">
          <i class="icon close" @click = "showPicker = false"></i>
        </button>
      </div>
      <ul class="label-main" @click.stop>
        <li v-for = "val,key in labelData" :class = "{editting: val.editting}">
          <a 
          class="ui fluid label big" 
          :class = "val.color" 
          @click = "selectOne(val)"
          >{{val.text}}
            <span class="label-checked" v-if = "val.picked">
              <i class="icon checkmark"></i>
            </span>
          </a>
          <input type="text" name="" value="" ref = "editInput" @blur = "val.editting = false"
           >
          <button 
          class="mini ui button green label-save"
          @mousedown = "saveText(val, key)"
          >保存</button>
          <button 
          class = "label-edit"
          @click = "editText(val , key)"
          >
            <i class="icon edit white" style="color:black;font-size:24px;left:0;top:0"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: '',
  props: {
    eventbus: Object
  },
  data () {
    return {
      labelData: [
        {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
        {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
        {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
        {id: 4, text: '不急不急', color: 'green', picked: false, editting: false},
        {id: 5, text: '随便做做', color: 'black', picked: false, editting: false}
      ],
      showPicker: false
    }
  },
  created () {
    // 点击文档隐藏选标签框
    document.addEventListener('click', function () {
      this.showPicker = false
    }.bind(this))
  },
  methods: {
    // 点击使用标签
    selectOne (val) {
      val.picked = !val.picked
      // 返回给父级
      this.eventbus.$emit('getlabel', this.labelData)
    },
    // 弹出编辑文本
    editText (val, key) {
      val.editting = true
      let targetInp = this.$refs.editInput[key]
      Vue.nextTick(function () {
        targetInp.focus()
      })
    },
    // 保存
    saveText (val, key) {
      let textVal = this.$refs.editInput[key].value.trim()
      if (!textVal) return
      val.text = textVal
      val.editting = false
      this.$refs.editInput[key].value = ''
      // 返回给父级
      this.eventbus.$emit('getlabel', this.labelData)
    }
  },
  mounted () {
    this.eventbus.$on('showLabel', function () {
      this.showPicker = !this.showPicker
    }.bind(this))
    this.eventbus.$on('sentlabel', function (labels) {
      // 父级组件传过来的labels
      this.labelData = labels
    }.bind(this))
  }
}
</script>
<style lang="css">
  ul{
    margin: 0;
  }
  li{
    list-style: none;
  }
  /*容器*/
  #label-wrap{
    position: relative;
  }
  /*选择面板 按钮*/
  .label-pick button{
    background: none;
    border: none;
    outline: none;
  }
  /*选择面板*/
  .label-pick{
    top: -140px;
    right: -160px;
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    width: 300px;
    min-height: 200px;
    border: 2px solid rgba(207, 222, 231, 0.5);
    padding-bottom: 50px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  /*选择面板 头部*/
  .label-head{
    width: 100%;
    height: 30px;
    padding: 0px 14px;
    margin-bottom: 20px;
  }
  .label-head h3{
    text-align: center;
    border-bottom:1px solid rgb(75, 177, 204);
    font-weight: normal;
    position: relative;
  }
  .label-head .close-label{
    height: 28px;
    position: absolute;
    border-radius: 5px;
    right: 0;
    top: 0;
    background: white;
  }
  .close-label:hover{
    background:rgb(188, 204, 252) ;
  }
  .label-main{
    padding:0px 10px;
  }
  /*每一条标签容器*/
  .label-main li{
    width: 90%;
    margin-bottom: 16px;
    position: relative;
  }
  .label-main input{
    height: 36px;
    width: 90%;
    display: none;
  }
  /*编辑状态下*/
  .label-main li.editting a {
    display: none;
  } 
  .label-main li.editting input{
    display: block;
  }
  .label-main li.editting .label-edit {
    display: none;
  }
  /*加了个id只是为了覆盖semantic*/
  #label-wrap .label-main li.editting .label-save{
    display: inline-block;
  }
  #label-wrap .label-save{
    display: none;
    padding: 4px;
    margin: 0;
    position: absolute;
    right: -20px;
    width: 40px;
    height: 30px;
    text-align: center;
    top: 4px;
  }
  /*选中小图标*/
  .label-checked{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  /*编辑文本*/
  .label-edit{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 8px;
    right: -24px;
  }
</style>
