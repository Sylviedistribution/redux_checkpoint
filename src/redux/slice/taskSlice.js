import { createSlice } from "@reduxjs/toolkit";
import { TaskStatus } from "../../models/Status";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    taskToEdit: null,
    taskToDelete: null,
    filter: 'all'
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    toggleTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        const index = state.tasks.findIndex((t) => t.id === taskId);
        state.tasks[index].status =
          state.tasks[index].status === TaskStatus.DONE ? TaskStatus.NOT_DONE : TaskStatus.DONE;
      }
    },
    
    editTask: (state, action) => {
        const taskToEdit = action.payload;
        const task = state.tasks.find((task)=>task.id === taskToEdit.id);   
        if (task) {
            const index = state.tasks.findIndex((task) => task.id === taskToEdit.id);
            state.tasks[index] = {...task, ...taskToEdit};
        }
        state.taskToEdit = null;
    },

    saveTaskToEdit: (state, action) => {
      state.taskToEdit = action.payload;
    },

    deleteTask: (state, action) => {
        const taskId = action.payload;
        state.tasks = state.tasks.filter((t)=> t.id !== taskId);
        state.taskToDelete = null;
    },

    saveTaskToDelete: (state, action) => {
      state.taskToDelete = action.payload;
    },

    tasksFilter: (state, action) => {
      state.filter = action.payload;
    },

  },
});

export const { addTask, toggleTask, editTask, saveTaskToEdit, deleteTask, saveTaskToDelete, tasksFilter } = taskSlice.actions; // Create auto-generated action creators e.g dispatch(addTask(payload)), dispatch(editTask(payload)); dispatch(setFilter(payload));
export default taskSlice.reducer;