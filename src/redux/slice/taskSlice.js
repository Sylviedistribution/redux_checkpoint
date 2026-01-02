import { createSlice } from "@reduxjs/toolkit";

const status = {
  DONE: "DONE",
  NOTDONE: "NOT_DONE",
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

    toggleTask: (state, action) => {
      const task = action.payload;
      const index = state.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        state.tasks[index].status =
          state.tasks[index].status === status.done ? status.onhold : status.done;
      }
    },
    
    editTask: (state, action) => {
        const {id, title, description,status} = action.payload;
        const task = state.tasks.find((task)=>task.id === id);   
        if (task) {
            const index = state.tasks.findIndex((task) => task.id === id);
            state.tasks[index] = {...task, title, description, status};
        }
    },

    deleteTask: (state, action) => {
        const task = action.payload;
        state.tasks = state.tasks.filter((t)=> t.id !== task.id);
    },

    tasksFilter: (state, action) => {
      state.filter = action.payload;
    },

  },
});

export const { addTask, toggleTask, editTask, deleteTask, tasksFilter } = taskSlice.actions; // Create auto-generated action creators e.g dispatch(addTask(payload)), dispatch(editTask(payload)); dispatch(setFilter(payload));
export default taskSlice.reducer;