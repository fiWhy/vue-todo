<template>
  <div id="app">
    <TodoListAdd @add="handleAdd" />
    <TodoList
      :items="items"
      @item:check="handleCheck"
      @item:remove="handleRemove"
      @item:change-position="handleChangePosition"
    />
    <div>
      <div>Total: {{ items.length }}</div>
      <div>Finished: {{ finishedItems.length }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
  computed: {
    ...mapState({
      items: (state) => state.listItems,
    }),
    ...mapGetters(['finishedItems']),
  },
  methods: {
    handleAdd(content) {
      store.commit('addListItem', {
        id: uuidv4(),
        content,
        checked: false,
      });
    },
    handleChangePosition(info) {
      this.dragItemIndex = null;
      store.commit('changeListItemPosition', info);
    },
    handleRemove(item) {
      store.commit('removeListItem', item);
    },
    handleCheck(item) {
      console.log(item);
      store.commit('checkListItem', item);
    },
  },
};
</script>

<style lang="scss"></style>
