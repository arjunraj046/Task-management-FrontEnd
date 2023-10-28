import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer, Persistor } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import { apiSlice } from "../features/api";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedUserAuthReducer = persistReducer(persistConfig, taskListReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // taskList: persistedUserAuthReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
