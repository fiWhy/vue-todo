<template>
  <div class="todo__add">
    <input v-model="content" />
    <button v-on:click="$emit('add', content)">Add</button>
  </div>
</template>
<script>
export default {
  name: 'TodoListAdd',
  data() {
    return {
      content: '',
    };
  },
};
</script>
