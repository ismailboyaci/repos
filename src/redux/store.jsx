import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducer/todoReducer";



export const appStore = configureStore({
  reducer: {
    todos: todosReducer,
  },
});