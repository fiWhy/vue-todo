<template>
  <div class="todo__list">
    <DropZone
      :class="{ 'non-drag': draggingElementIndex === 0 }"
      :position="0"
      @drop="handleDrop"
    />
    <template v-for="(item, i) in items">
      <TodoItem
        :key="`item-${item.id}`"
        :item="item"
        :is-dragging="item === draggingElement"
        @dragend="handleDragEnd"
        @dragstart="handleDragStart(i)"
        @check="handleCheck"
        @remove="handleRemove"
        :number="i + 1"
      />
      <DropZone
        :class="{
          'non-drag': draggingElementIndex === i || draggingElementIndex === i + 1,
        }"
        :key="`drop-zone-${item.id}`"
        :position="i + 1"
        @drop="handleDrop"
      />
    </template>
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
      draggingElement: null,
      draggingElementIndex: null,
      model: 1,
    };
  },
  methods: {
    handleDragStart(index) {
      this.draggingElement = this.items[index];
      this.draggingElementIndex = index;
      this.$emit('dragstart', this.draggingElement);
    },
    handleDragEnd() {
      this.$emit('dragend');
      this.draggingElement = null;
      this.draggingElementIndex = null;
    },
    handleDrop(to) {
      const item = this.draggingElement;
      this.$emit('item:change-position', {
        item,
        to,
      });
    },
    handleCheck(item) {
      this.$emit('item:check', item);
    },
    handleRemove(item) {
      this.$emit('item:remove', item);
    },
  },
};
</script>
<style lang="scss">
.todo__list {
  display: flex;
  flex-direction: column;
}
</style>
