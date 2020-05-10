import Vue from 'vue';
import Vuex from 'vuex';
import move from '../lib/move';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dragListItem: null,
    listItems: [],
  },
  mutations: {
    removeListItem(state, id) {
      state.listItems = state.listItems.filter((item) => item.id !== id);
    },
    checkListItem(state, id) {
      const elementIndex = state.listItems.findIndex((item) => item.id === id);
      const element = { ...state.listItems[elementIndex], checked: true };
      state.listItems = [
        ...state.listItems.slice(0, elementIndex),
        element,
        ...state.listItems.slice(elementIndex + 1),
      ];
    },
    addListItem(state, item) {
      state.listItems = [...state.listItems, item];
    },
    changeListItemPosition(state, { item, to }) {
      const itemIndex = state.listItems.findIndex((listItem) => listItem.id === item.id);
      if (itemIndex > to) {
        const position = Math.min(to, state.listItems.length - 1);
        state.listItems = move(state.listItems, itemIndex, position);
      } else if (itemIndex < to && to - itemIndex > 1) {
        state.listItems = move(state.listItems, itemIndex, Math.max(to - 1, 0));
      } else {
        state.listItems = [...state.listItems];
      }
    },
    dragStart(state, index) {
      state.dragListItem = state.listItems[index];
    },
    dragEnd(state) {
      state.dragListItem = null;
    },
  },
  actions: {},
  modules: {},
});
