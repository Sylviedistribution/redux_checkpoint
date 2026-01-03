# My ToDo App

A simple ToDo application built with **React** and **Redux Toolkit** that allows users to manage tasks with persistent storage in the browser using **localStorage**.

---

## Features

- **Add a new task** with name, description, and due date
- **Edit existing tasks**
- **Delete tasks** with confirmation prompt
- **Filter tasks** by status:
  - All
  - Done
  - Not done
- **Persistent storage**: tasks are saved to localStorage, so they remain after page reload
- **Form validation**: ensures task name, description, and due date are valid
- **UI feedback**: error messages for invalid fields and a warning box for deletion confirmation

---

## Project Structure

src/
├─ components/
│ ├─ Header.js # App header
│ ├─ Footer.js # App footer
│ ├─ TaskForm.js # Form to add or edit a task
│ ├─ TaskList.js # List of tasks with filter
│ └─ TaskItem.js # Single task item
├─ redux/
│ └─ slice/
│ └─ taskSlice.js # Redux slice managing tasks
├─ utils/
│ └─ WarningBox.js # Component for delete confirmation
├─ models/
│ └─ Status.js # Enum for task status (ONHOLD, DONE, NOT_DONE)
└─ App.js # Main component assembling the app


## State Management

### Redux Slice (`taskSlice`)

- **Initial State**:
```js
{
  tasks: [],        // Array of task objects
  taskToEdit: null, // Task currently being edited
  taskToDelete: null, // Task pending deletion
  filter: "all"     // Current filter (all, done, not_done)
}
```
Reducers:

addTask → Adds a new task

editTask → Updates an existing task

deleteTask → Removes a task

saveTaskToEdit → Stores task to edit

saveTaskToDelete → Stores task to delete

tasksFilter → Updates filter state

toggleTask → Toggle task completion status

Persistence:

Only the tasks array is saved to localStorage via a store.subscribe function.

UI state (taskToEdit, taskToDelete, filter) is not persisted.

Selector

const selectFilteredTasks = createSelector(
  (state) => state.tasks.tasks || [],
  (state) => state.tasks.filter,
  (tasks, filter) => {
    switch (filter) {
      case "done":
        return tasks.filter((task) => task.status === TaskStatus.DONE);
      case "not_done":
        return tasks.filter((task) => task.status === TaskStatus.NOT_DONE);
      default:
        return tasks;
    }
  }
);
Returns tasks based on the currently selected filter.

Components Overview

TaskForm
-Controlled form using React useState and useEffect.

-Validates inputs before dispatching addTask or editTask.

-Handles preloading of data when editing a task.

TaskList
-Displays tasks using TaskItem.

-Includes radio buttons to filter tasks: All, Done, Not Done.

-Uses selectFilteredTasks selector for filtered tasks.

TaskItem
-Displays individual task details.

-Includes edit and delete actions.

WarningBox
-Confirmation modal displayed before deleting a task.

How to Run
Clone the repo:

git clone https://github.com/Sylviedistribution/redux_checkpoint

Install dependencies:
npm install

Start the app:
npm start

Notes
Task IDs are generated using crypto.randomUUID() for uniqueness.

Task status is controlled via TaskStatus enum.

Deletion confirmation ensures tasks are not removed accidentally.

Form validation prevents invalid tasks from being added or edited.

localStorage ensures tasks persist across page reloads.

Author
Sylvestre IBOMBO GAKOSSO
