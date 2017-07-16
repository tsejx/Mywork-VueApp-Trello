<template>
  <div class="dnd-drop-content">
    <slot></slot>
  </div>
</template>

<script>
import { Drop } from 'dnd.js'

export default {
  name: 'Droppable',

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
      new Drop(this.$el, {
        onDragStart (params) {
          self.$emit('dragstart', params)
        },
        onDragEnter (params) {
          self.$emit('dragenter', params)
        },
        onDragOver (params) {
          self.$emit('dragover', params)
        },
        onDragLeave (params) {
          self.$emit('dragleave', params)
        },
        onDrop (params) {
          self.$emit('drop', params)
        },
        onDragEnd (params) {
          self.$emit('dragend', params)
        }
      })
    }
  }
}
</script>
