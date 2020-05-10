<template>
  <div id="app">
    <TodoListAdd v-on:add="handleAdd" />
    <TodoList v-bind:items="items" v-on:item:change-position="handleChangePosition" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import store from './store';
import TodoList from './components/TodoList.vue';
import TodoListAdd from './components/TodoListAdd.vue';

export default {
  name: 'App',
  components: {
    TodoList,
    TodoListAdd,
  },
  computed: mapState({
    items: (state) => state.listItems,
  }),
  methods: {
    handleAdd(content) {
      store.commit('addListItem', {
        id: uuidv4(),
        content,
        checked: false,
      });
    },
    handleChangePosition(info) {
      store.commit('changeListItemPosition', info);
    },
  },
};
</script>

<style lang="scss">
</style>
