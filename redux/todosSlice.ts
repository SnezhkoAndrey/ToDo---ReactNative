import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface TodoType {
  id: number;
  todo: string;
  date: string;
}

const initialState = {
  todos: [] as TodoType[],
  completeTodos: [] as TodoType[],
  failTodos: [] as TodoType[],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const newTodos = state.todos.filter((t) => t.id !== action.payload);
      const deletedTodos = state.todos.filter((t) => t.id === action.payload);
      state.todos = newTodos;
      state.failTodos = [...state.failTodos, ...deletedTodos];
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      const newTodos = state.todos.filter((t) => t.id !== action.payload);
      const completedTodos = state.todos.filter((t) => t.id === action.payload);
      state.todos = newTodos;
      state.completeTodos = [...state.completeTodos, ...completedTodos];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const itsCompleteTodo = state.completeTodos.filter(
        (arr) => arr.id === action.payload
      );
      if (itsCompleteTodo.length !== 0) {
        const newTodos = state.completeTodos.filter(
          (arr) => arr.id !== action.payload
        );
        state.completeTodos = newTodos;
      } else {
        const newTodos = state.failTodos.filter(
          (arr) => arr.id !== action.payload
        );
        state.failTodos = newTodos;
      }
    },
  },
});

export const { setTodos, removeTodo, completeTodo, deleteTodo } =
  todosSlice.actions;

export const selectTodos = ({ todo }: RootState) => todo.todos;
export const selectCompleteTodos = ({ todo }: RootState) => todo.completeTodos;
export const selectFailTodos = ({ todo }: RootState) => todo.failTodos;

export default todosSlice.reducer;
