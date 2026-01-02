import { createSlice } from "@reduxjs/toolkit";
import { not } from "three/examples/jsm/nodes/Nodes.js";

const status = {
  done: "done",
  onhold: "onhold",
}

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filter: 'all'
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
        const {id, title, description,status} = action.payload;
        const task = state.tasks.find((task)=>task.id === id);   
        if (task) {
            const index = state.tasks.findIndex((task) => task.id === id);
            state.tasks[index] = {...task, title, description};
        }
    },

    deleteTask: (state, action) => {
        const task = action.payload;
        state.tasks = state.tasks.filter((t)=> t.id !== task.id);
    },

  },
});

export const { addTask, toggleTask, editTask, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
