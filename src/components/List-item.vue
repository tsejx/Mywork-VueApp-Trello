<template>
  <div class="item-root" @mousedown.stop @click.stop>
    <draggable
      :data="{index, listdata}"
      @dragstart="onSourceDragStart"
      ref = "drag-ele"
    >
      <droppable
        class="drop-box"
        @dragend="onDragEnd"
        @drop="onDrop"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
      >
        <!-- 检测到拖动时显示的 -->
        <li class="card-item" v-if = "isShowDrop">
          <div 
            class="card-drop-con" 
            :style="dropBox"
          >
          </div>
        </li>
        <!-- 列表项 -->
        <li
          class="card-item"
          @mouseenter="showRenameBtn"
          @mouseleave="hiddenRenameBtn"
          @click.prevent = "showOwnEdit(item)"
          @mousedown.prevent
          v-if = "isShowDefalut"
          ref = "listItem"
        >
          <div class="card-default-con">
            <div
              class="card-cover"
              v-show="haveImage(item.attachments)"
              :style = "[haveImage(item.attachments)? { backgroundImage:'url(' + item.attachments[0].src + ')'} : '']"
            ></div>
            <a
            class="mini ui right icon vertical button rename-card-item"
            @click.stop = "quickEdit(item)"
            ><i class="large edit icon"></i>
            </a>
            <div class="card-item-content" id = "card-item-content">
              <div class="card-item-label" v-show="canShowLabel">
                <span
                  class="ui label card-label"
                  v-for="label in item.labels"
                  v-if = "label.picked"
                  v-bind:class = "label.color"
                >
                </span>
              </div>
              <div class="card-item-detail">{{item.text}}</div>
              <div class="card-item-badges">
                <div
                class="badge"
                title="到期时间"
                v-show="item.deadline">
                  <i class="calendar icon"></i>
                  <span>{{timeChange(item.deadline)}}</span>
                </div>
                <div class="badge" title="这张卡片有描述" v-show="Object.keys(item.des).length">
                  <i class="align left icon"></i>
                </div>
                <div
                class="badge"
                title="评论"
                v-show="item.comments.length">
                  <i class="comments icon"></i>
                  <span>{{item.comments.length}}</span>
                </div>
                <div
                  class="badge"
                  title="附件"
                  v-show="item.attachments.length"
                >
                  <i class="attach  icon"></i>
                  <span>{{item.attachments.length}}</span>
                </div>
              </div>
            </div>
          </div>  
        </li>
      </droppable>
    </draggable>
  </div>
</template>
<script>
import Draggable from './draggable.vue'
import Droppable from './droppable.vue'
import Vue from 'vue'
export default {
  name: 'listItem',
  props: {
    item: Object,
    databus: Object,
    listdata: Object,
    index: Number
  },
  data () {
    return {
      isShowDrop: false,
      isShowDefalut: true,
      isShowLabel: false,
      dropBox: {
        'width': '100%',
        'height': '200px',
        'backgroundColor': '#c4c9cc'
      }
    }
  },
  components: {
    Draggable,
    Droppable
  },
  computed: {
    canShowLabel () {
      this.isShowLabel = false
      this.item.labels.forEach((label) => {
        if (label.picked === true) {
          this.isShowLabel = true
        }
      })
      return this.isShowLabel
    }
  },
  methods: {
    // 拖放插件方法
    onSourceDragStart (params) {
      // 克隆的节点旋转角度
      var mark = document.querySelector('.x-drag-mark')
      mark.style.transform = 'rotate(2deg)'
    },
    onDragEnd (params) {
      // 隐藏阴影框
      // 还原默认的内容框
      this.isShowDrop = false
      this.isShowDefalut = true
    },
    onDrop (params) {
      // drop 的列表添加数据
      this.listdata.item.splice(this.index, 0, params.data.listdata.item[params.data.index])
      // 原列表删除该数据
      if (params.data.listdata.title === this.listdata.title && params.data.index > this.index) {
        // 同一列表下 并且 由下往上移 注意删除的索引要+1
        params.data.listdata.item.splice(params.data.index + 1, 1)
        return
      }
      params.data.listdata.item.splice(params.data.index, 1)
    },
    onDragEnter (params) {
      // 克隆出来的节点获取
      var mark = document.querySelector('.x-drag-mark')
      let dragHeight = mark.children[0].style.height
      // 进入自身的dropbox不需要有交互
      if (params.sourceNode === this.$refs['drag-ele'].$el) {
        this.isShowDefalut = false
      }
      // 显示阴影框并且修改框的样式
      this.isShowDrop = true
      this.dropBox.height = dragHeight
    },
    onDragLeave (params) {
      // 隐藏阴影框
      this.isShowDrop = false
    },
    timeChange (preTime) {
      if (!preTime) return
      let str = ''
      let m = preTime.getMonth() + 1
      let d = preTime.getDate()
      str = m + '月' + d + '日'
      return str
    },
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
    showRenameBtn (e) {
      e.target.classList.add('active-card')
    },
    hiddenRenameBtn (e) {
      e.target.classList.remove('active-card')
    },
    // 打开简易的编辑面板
    quickEdit (oneListData) {
      let item = this.$refs.listItem
      let Rect = item.getBoundingClientRect()
      let positon = {'left': Rect.left + 'px', 'top': Rect.top + 'px'}
      // 显示面板
      this.$emit('quickedit')
      Vue.nextTick(() => {
        // 传送数据
        this.databus.$emit('sendListDataQuick', oneListData, positon, this.index, this.listdata)
        // 更新数据
        this.databus.$emit('sendListData', oneListData)
      })
    },
    // 点击显示编辑面板
    // 并且传数据
    showOwnEdit (oneListData) {
      // 传给父组件的控制显示
      this.$emit('startedit')
      // 传给兄弟组件的 带数据
      Vue.nextTick(() => {
        this.databus.$emit('sendListData', oneListData)
        // this.databus.$emit('sendListDataQuick', oneListData)
      })
    }
  }
}
</script>

<style lang="css">
  @import '../assets/style/reset.css';
  @import '../assets/style/list.css';
</style>
