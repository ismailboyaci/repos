import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import produce from "immer";

import todoData from "../../data.json";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: todoData,
    index: 0,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      return state;
    },

    addSubTodo: (state, action) => {
      const copyState = produce(state, (draft) => {
        [current(draft.todos[state.index].subdata)][0].push(action.payload);
      });
      return copyState;
    },

    changeIndex: (state, action) => {
      state.index = action.payload;
    },

    setToggle: (state, action) => {
      var childIndex = [current(state.todos[state.index].subdata)][0].findIndex(
        (item) => item.id === action.payload
      );
      var newState = produce(state, (draftState) => {
        current(draftState.todos[state.index].subdata)[
          childIndex
        ].complete = true;
      });
      return newState;
    },

    setUnToggle: (state, action) => {
      var childIndex = [current(state.todos[state.index].subdata)][0].findIndex(
        (item) => item.id === action.payload
      );
      var newState = produce(state, (draftState) => {
        current(draftState.todos[state.index].subdata)[
          childIndex
        ].complete = false;
      });
      return newState;
    },
  },
});

export const { addTodo, addSubTodo, changeIndex, setToggle, setUnToggle } = todoSlice.actions;
export default todoSlice.reducer;
