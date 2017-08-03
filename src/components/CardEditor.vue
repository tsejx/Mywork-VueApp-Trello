<template>
  <div class="card-editor-wrapper" v-if = "showQuick">
    <div class="quick-card-editor" :style="positon">
      <span id="clear-margin" class="ui icon button quick-card-editor-close-btn">
        <i class="large remove icon"></i>
      </span>
      <div class="quick-card-editor-card">
        <div class="list-card-quick-edit"@click.stop>
          <div
            class="card-cover"
            v-show="haveImage(oneListData.attachments)"
            :style = "[haveImage(oneListData.attachments)? { backgroundImage:'url(' + oneListData.attachments[0].src + ')'} : '']"
          ></div>
          <div 
            class="card-item-label"
            id = "card-item-label" 
            v-if = "oneListData.labels.length "
          >
            <span
              class="ui label card-label"
              v-for="label in oneListData.labels"
              v-if = "label.picked"
              v-bind:class = "label.color"
            >
            </span>
          </div>
          <input 
            class="detail-input" 
            :value ="oneListData.text" ref ="detailInp"/>
          <div class="card-item-badges">
            <div
            class="badge"
            title="到期时间"
            v-show="oneListData.deadline">
              <i class="calendar icon"></i>
              <span>{{timeChange(oneListData.deadline)}}</span>
            </div>
            <div 
              class="badge" 
              title="这张卡片有描述" 
              v-show="Object.keys(oneListData.des).length"
            >
              <i class="align left icon"></i>
            </div>
            <div
            class="badge"
            title="评论"
            v-show="oneListData.comments.length">
              <i class="comments icon"></i>
              <span>{{oneListData.comments.length}}</span>
            </div>
            <div
              class="badge"
              title="附件"
              v-show="oneListData.attachments.length"
            >
              <i class="attach icon"></i>
              <span>{{oneListData.attachments.length}}</span>
            </div>
          </div>
        </div>
        <input
          class="ui button green save-edits"
          type="submit"
          value="保存"
          @click = "saveText"
        >
        <div id="quick-date-wrap" @click.stop>
          <picker 
            @senddate = "setDeadline"
            :eventbus = "eventbus"
          ></picker>
          <div id="quick-label-wrap">
            <LabelPicker
              @sendlabel = "setLabel"
              :eventbus = "eventbus"
            ></LabelPicker>
          </div>
        </div>
        <ul id="card-editor-btns" class="ui animated list quick-card-editor-buttons">
          <li class="item" @click.stop>
            <a 
              href="#" 
              class="ui mini button black quick-card-editor-buttons-item"
              @click = "showLabel"
            >
              <i class="icon tags" >
              </i>
              修改标签
            </a>
          </li>
          <li class="item" @click.stop>
            <a 
              href="#" 
              class="ui mini button black quick-card-editor-buttons-item"
              @click = "showDate"
            >
              <i class="icon wait " >
              </i>
              修改到期日
            </a>
          </li>
          <li class="item" @click.stop>
            
            <el-upload
              class="upload-demo"
              action="/fileupdate"
              :on-preview="handlePreview"
              :on-success = "handleSucc"
              :file-list="fileList">
              <a 
                href="#" 
                class="ui mini button black quick-card-editor-buttons-item"
              >
                <i class="icon wait " >
                </i>
                上传头像
              </a>
            </el-upload>
          </li>
          <li class="item">
            <a 
              href="#" 
              class="ui mini button black quick-card-editor-buttons-item"
              @click = "delItem"
            >
              <i class="icon delete alternate" >
              </i>
              删除
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import picker from '@/components/Date-picker'
import LabelPicker from '@/components/Label-picker'
import {upload} from 'element-ui'

Vue.use(upload)

let eventbus = new Vue({})
export default {
  name: 'cardeditor',
  props: {
    // 快速编辑面板与列表子项的通信
    databus: Object
  },
  components: {
    picker,
    LabelPicker
  },
  data () {
    return {
      showQuick: true,
      positon: {},
      eventbus,
      oneListData: {
        text: '',
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {
        },
        attachments: [
        ],
        comments: [
        ],
        deadline: null
      },
      // 用于删除数据
      parentData: {
        title: '',
        item: []
      },
      index: 0,
      // 数据上传
      fileList: []
    }
  },
  mounted () {
    var _this = this
    this.databus.$on('sendListDataQuick', function (data, positon, index, listdata) {
      Vue.nextTick(() => {
        _this.positon = positon
        _this.oneListData = data
        _this.parentData = listdata
        _this.index = index
        Vue.nextTick(() => {
          _this.$refs.detailInp.select()
        })
      })
    })
    this.eventbus.$on('getlabel', function (labels) {
      _this.oneListData.labels = labels
    })
  },
  methods: {
    haveImage (data) {
      let hasImage = false
      if (typeof data === 'undefined') return
      data.forEach(function (item) {
        if (item.type === 'image') {
          hasImage = true
        }
      })
      return hasImage
    },
    timeChange (preTime) {
      if (!preTime) return
      let str = ''
      let m = preTime.getMonth() + 1
      let d = preTime.getDate()
      str = m + '月' + d + '日'
      return str
    },
    saveText () {
      let inp = this.$refs.detailInp
      let val = inp.value.trim()
      if (val === '') return
      this.oneListData.text = val
    },
    delItem () {
      this.parentData.item.splice(this.index, 1)
    },
    // 接受并修改到期日
    setDeadline (date) {
      this.oneListData.deadline = date
    },
    // 显示日历
    showDate () {
      this.eventbus.$emit('showDate')
    },
    // 接受并修改标签
    setLabel (val) {
      this.oneListData.labels = val
    },
    showLabel () {
      this.eventbus.$emit('showLabel')
      // 传递的标签信息
      this.eventbus.$emit('sentlabel', this.oneListData.labels)
    },
    // 处理上传头像
    handlePreview (file, fileList) {
      console.log(file, fileList)
    },
    handleSucc (response, file, fileList) {
      this.oneListData.attachments.pop()
      this.oneListData.attachments.push({
        id: Date.now(),
        type: 'image',
        src: `./static/img/${response}`
      })
      console.log(response)
    }
  }
}
</script>

<style>
  @import '../assets/style/reset.css';
  #quick-date-wrap .datepickbox {
    display: none;
  }
  #quick-label-wrap .label-show {
    display: none;
  }
  /* 快速卡片编辑器 */
  .card-editor-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left:0;
    top:0;
    background-color: rgba(0, 0, 0, 0.6);
    overflow-y: auto;
    z-index: 99
  }
  
  .quick-card-editor {
    position: absolute;
    top: 60px;
    width: 260px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1.0);
  }
  
  #clear-margin {
    margin: 0;
    background: transparent;
    color: rgba(140, 140, 140, 1.0);
  }
  
  #clear-margin:hover {
    color: rgba(255, 255, 255, 1.0);
  }
  
  .quick-card-editor-close-btn {
    position: fixed;
    top: 0;
    right: 0;
  }

  .save-edits {
    position: absolute;
    left: 0;
    bottom: -50px;
  }
  
  .quick-card-editor-buttons {
    position: absolute;
    left: 270px;
    top: -10px;
    width: 140px;
    height: 300px;
  }
  
  
  .quick-card-editor-buttons li {
    height: 36px;
    padding: 10px;
    list-style: none;
  }
  
  #card-editor-btns li::before {
    content: '';
  }
  
  .quick-card-editor-buttons-item {
    float: left;
    margin: 10px;
    font-size: 12px;
    vertical-align: center;
  }
  
  .detail-input {
    display: block;
    border: none;
    background: none;
    white-space: normal;
    margin: 0;
    outline: none;
    width: 100%;
    height: 34px;
  }
  #card-editor-btns .el-upload-list__item {
    display: none;
  }
</style>
