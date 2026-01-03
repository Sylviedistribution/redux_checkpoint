import { configureStore } from "@reduxjs/toolkit";
import taskReducer, {
  initialState as taskInitialState,
} from "../slice/taskSlice";

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("tasksState", JSON.stringify(state.tasks.tasks)); 
    // Save only the tasks array to localStorage, ignoring temporary UI state like taskToEdit or taskToDelete
  } catch (e) {
    console.log("Could not save state" + e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem("tasksState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    return undefined; // If error, return undefined to use initial state
  }
};

const persistedTasks = loadFromLocalStorage();

const preloadedState = {
  tasks: {
    ...taskInitialState,
    tasks: persistedTasks || [], // Merge only the tasks array if available
  },
};

const store = configureStore({
  reducer: {
    tasks: taskReducer, //It's a function that contains all the reducers related to tasks and provide also the initial state

    //Can add more slices here for other features
    // e.g., users: userSlice

    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), if I create a logger middleware
  },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState()); // Subscribe is called on every state change. eg: after dispatching an action
});

export default store;
