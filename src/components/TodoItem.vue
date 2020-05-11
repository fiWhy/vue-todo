<template>
  <div
    class="todo__item"
    :draggable="true"
    :class="{ dragging: isDragging, checked: item.checked }"
    @mouseenter="deletable = true"
    @mouseleave="deletable = false"
    @dragend="$emit('dragend')"
    @dragstart="$emit('dragstart')"
  >
    <div class="todo__item__chunk todo__item__check">
      <input type="checkbox" @change="handleCheck(item)" :value="item.checked" />
    </div>
    <div class="todo__item__chunk todo__item__number">{{ number }}</div>
    <div class="todo__item__chunk todo__item__content">{{ item.content }}</div>
    <transition name="fade">
      <div v-if="deletable" class="todo__item__chunk todo__item__actions">
        <button @click="handleRemove(item)">X</button>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'TodoItem',
  props: {
    number: Number,
    item: Object,
    isDragging: Boolean,
    dragstart: Function,
    check: Function,
    remove: Function,
  },
  data() {
    return {
      deletable: false,
    };
  },
  methods: {
    handleRemove(item) {
      this.$emit('remove', item);
    },
    handleCheck(item) {
      this.$emit('check', item);
    },
  },
};
</script>
<style lang="scss">
.todo__item {
  width: 100%;
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: grab;
  }
  &.dragging {
    cursor: grabbing;
  }

  &.checked {
    .todo__item__content {
      text-decoration: line-through;
    }
  }
  &__check {
    width: 5%;
  }
  &__number {
    width: 5%;
  }
  &__content {
    width: 80%;
  }
  &__actions {
    width: 10%;
  }

  .fade {
    @mixin transition-rule {
      transition: opacity 0.5s;
    }
    &-enter {
      opacity: 0;
      &-active {
        @include transition-rule;
      }
    }
    &-leave {
      &-active {
        @include transition-rule;
      }
      &-to {
        opacity: 0;
      }
    }
  }
}
</style>
