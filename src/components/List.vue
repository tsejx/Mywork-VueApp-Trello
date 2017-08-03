<template lang="html">
  <div class="list-wrap">
    <div class="list-item">
      <div class="list-header">
        <h2
          class="ui small header list-header-title"
          @click="toggleListTitle"
          ref = "title"
        >
        {{listdata.title}}
        </h2>
        <textarea
          class="list-header-input"
          spellcheck="false"
          @input="adaptHeight"
          @blur="blurChangeListTitle"
          maxlength="512"
          ref = "input"
        ></textarea>
        <div 
          class="mini ui icon button list-dynamic"
          @click.stop = "optionOpen"
        >
          <i class="ellipsis horizontal icon"></i>
        </div>
      </div>
      <ul class="cards-list">
        <ListItem
          v-for="item,key in listdata.item"
          key = "key"
          :index = "key"
          :item = "item"
          :listdata = "listdata"
          :databus = "databus"
          @startedit = "showEdit"
          @quickedit = "quickedit"
        ></ListItem>
      </ul>
      <div class="new-card">
        <a 
          class="add-card-btn" 
          @click="toggleAddCardItem"
          ref = "btnAddCard"
          href="#"
        >添加卡片...</a>
        <div 
          class="card-composer active"
          ref = "panelAddCard"
        >
          <textarea 
            class="newcard-detail" 
            @keyup="keyenterAddCardItem" 
            @blur="cancelAddCard" 
            spellcheck="false"
            ref = "textareaAddCard"
          >
          </textarea>
          <div>
            <button
              class="ui teal button btn-add"
              @mousedown="clickAddCardItem"
            >添加</button>
            <a 
              class="medium ui icon button btn-close" 
              @click="toggleAddCardItem" href="#"
            >
              <i class="remove icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ListItem from './List-item.vue'
import Vue from 'vue'

export default {
  name: 'list',
  props: {
    listdata: Object,
    databus: Object,
    index: Number,
    maindata: Array
  },
  components: {
    ListItem
  },
  methods: {
    toggleAddCardItem () {
      let btnAddCard = this.$refs.btnAddCard
      btnAddCard.classList.toggle('active')
      let panelAddCard = this.$refs.panelAddCard
      panelAddCard.classList.toggle('active')
      panelAddCard.firstElementChild.focus()
      panelAddCard.firstElementChild.value = ''
    },
    keyenterAddCardItem (e) {
      if (!e.target.value.trim()) return
      if (e.keyCode !== 13) return
      this.listdata.item.push({
        text: e.target.value,
        id: Date.now(),
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {},
        attachments: [],
        comments: [],
        deadline: null
      })
      e.target.value = ''
      this.toggleAddCardItem()
    },
    clickAddCardItem () {
      let textareaAddCard = this.$refs.textareaAddCard
      if (!textareaAddCard.value.trim()) return
      this.listdata.item.push({
        text: textareaAddCard.value,
        id: Date.now(),
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {},
        attachments: [],
        comments: [],
        deadline: null
      })
      textareaAddCard.value = ''
      this.toggleAddCardItem()
    },
    cancelAddCard (e) {
      this.toggleAddCardItem()
    },
    toggleListTitle () {
      let title = this.$refs.title
      let input = this.$refs.input
      title.classList.toggle('active')
      input.classList.toggle('is-editing')
      input.innerHTML = title.innerHTML
      input.select()
    },
    blurChangeListTitle (e) {
      e.preventDefault()
      let val = this.$refs.input.value.trim()
      if (val === '') {
        this.toggleListTitle()
        return
      }
      this.listdata.title = val
      this.toggleListTitle()
    },
    adaptHeight (e) {
      let textarea = e.target
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    },
    // 点击显示编辑面板
    showEdit () {
      // 传给父组件的控制显示
      this.$emit('startedit')
    },
    quickedit () {
      this.$emit('quickedit')
    },
    // 表头 右侧 列表操作
    optionOpen (e) {
      let positon = {
        'left': e.target.getBoundingClientRect().left + 'px',
        'top': e.target.getBoundingClientRect().top + 10 + 'px'
      }
      this.$emit('headoption')
      Vue.nextTick(() => {
        this.databus.$emit('dataToOpt', this.index, this.maindata, this.listdata, positon)
      })
    }
  }
}
</script>

<style lang="css">
  @import '../assets/style/reset.css';
  @import '../assets/style/list.css';
</style>
