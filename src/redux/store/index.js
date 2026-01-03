import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice/taskSlice";

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("tasksState", JSON.stringify(state.tasks));
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

const preloadedState = {
  tasks: loadFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    //Can add more slices here for other features
    // e.g., users: userSlice
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), if I create a logger middleware
  },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});



export default store;
