import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../slice/taskSlice'

const store = configureStore({
   reducer: {
    tasks: taskReducer
    //Can add more slices here for other features
    // e.g., users: userSlice
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), if I create a logger middleware
  },
});

export default store;
