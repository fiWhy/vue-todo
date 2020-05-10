<template>
  <div class="todo__list">
    <DropZone v-bind:position="0" v-on:drop="handleDrop" />
    <div v-bind:key="item.id" v-for="(item, index) in items">
      {{ index }}
      <TodoItem
        v-bind:number="index + 1"
        v-bind:item="item"
        v-on:dragend="handleDragEnd"
        v-on:dragstart="handleDragStart(index)"
      />
      <DropZone v-bind:position="index+1" v-on:drop="handleDrop" />
    </div>
  </div>
</template>
<script>

import TodoItem from './TodoItem.vue';
import DropZone from './DropZone.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    DropZone,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      draggableElement: null,
    };
  },
  methods: {
    handleDragStart(index) {
      this.draggableElement = this.items[index];
      this.$emit('dragstart', this.draggableElement);
    },
    handleDragEnd() {
      this.$emit('dragend');
    },
    handleDrop(to) {
      this.$emit('item:change-position', {
        item: this.draggableElement,
        to,
      });
    },
  },
};
</script>
