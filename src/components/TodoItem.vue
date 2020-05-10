<template>
  <div
    class="todo__item"
    v-bind:draggable="true"
    v-on:dragend="$emit('dragend')"
    v-on:dragstart="$emit('dragstart')"
  >
    <div class="todo__item__number">{{ number }}</div>
    <div class="todo__item__content">{{ item.content }}</div>
    <div class="todo__item__actions"></div>
  </div>
</template>
<script>
export default {
  name: 'TodoItem',
  props: {
    number: Number,
    item: Object,
  },
};
</script>
