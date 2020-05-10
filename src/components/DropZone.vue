<template>
  <div
    v-on:drop="handleDrop"
    v-on:dragover="$event.preventDefault()"
    v-on:dragenter="isDragActive = true"
    v-on:dragleave="isDragActive = false"
    v-bind:class="{entered: isDragActive}"
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
  height: 10px;
  width: 100%;
  &.entered {
    background-color: red;
  }
}
</style>
