<template>
  <div class="dnd-drag-content">
    <slot></slot>
  </div>
</template>

<script>
import { Drag } from 'dnd.js'
export default {
  name: 'Draggable',

  props: {
    data: null
  },

  data () {
    return {
      drag: null
    }
  },

  // Vue1.0
  ready () {
    this.init()
  },
  // Vue2.0
  mounted () {
    this.init()
  },

  methods: {
    init () {
      let self = this
      /* eslint-disable no-new */
      this.drag = new Drag(this.$el, {
        data: this.data,
        onDragStart (params) {
          self.$emit('dragstart', params)
        },
        onDragEnd (params) {
          self.$emit('dragend', params)
        }
      })
    }
  }
}
</script>
