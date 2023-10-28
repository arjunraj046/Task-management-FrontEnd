// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";
// interface TaskListState {
//   tasks: Task[];
// }

// const initialState: TaskListState = {
//   tasks: [],
// };

// interface Task {
//   id: number;
//   title: string;
//   description: string;
// }

// const taskListSlice = createSlice({
//   name: "taskList",
//   initialState,
//   reducers: {
//     addTask: (state, action: PayloadAction<Task>) => {
//       state.tasks.push(action.payload);
//     },
//     deleteTask: (state, action: PayloadAction<number>) => {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     },
//   },
// });

// export const { addTask, deleteTask } = taskListSlice.actions;
// export const selectTasks = (state: RootState) => state.taskList.tasks;
// export const taskListReducer = taskListSlice.reducer;
