<template>
  <div
    v-on:drop="handleDrop"
    v-on:dragover="$event.preventDefault()"
    v-on:dragenter="isDragActive = true"
    v-on:dragleave="isDragActive = false"
    v-bind:class="{ entered: isDragActive }"
    class="drop__zone"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'DropZone',
  props: {
    position: Number,
    drop: Function,
  },
  data() {
    return {
      isDragActive: false,
    };
  },
  methods: {
    handleDrop() {
      this.isDragActive = false;
      this.$emit('drop', this.position);
    },
  },
};
</script>
<style lang="scss">
.drop__zone {
  transition: height 0.5s, background-color 0.5s;
  height: 5px;
  width: 100%;
  &:not(.non-drag) {
    &.entered {
      height: 10px;
      background-color: red;
    }
  }
}
</style>
