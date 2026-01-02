import { configureStore } from "@reduxjs/toolkit";
import taskSlice from '../slice/taskSlice'

const store = configureStore({
   reducer: {
    todos: taskSlice
    //Can add more slices here for other features
    // e.g., users: userSlice
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), if I create a logger middleware
  },
});

export default store;
