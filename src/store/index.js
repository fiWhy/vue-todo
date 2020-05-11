import Vue from 'vue';
import Vuex from 'vuex';
import move from '../lib/move';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dragListItem: null,
    listItems: [],
  },
  getters: {
    finishedItems: (state) => state.listItems.filter((item) => item.checked),
  },
  mutations: {
    removeListItem(state, item) {
      state.listItems = state.listItems.filter((listItem) => listItem.id !== item.id);
    },
    checkListItem(state, item) {
      const elementIndex = state.listItems.findIndex((listItem) => listItem.id === item.id);
      const element = {
        ...state.listItems[elementIndex],
        checked: !state.listItems[elementIndex].checked,
      };
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
        state.listItems = move(state.listItems, itemIndex, to);
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
