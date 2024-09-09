import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieSlice from "./features/movie/movieSlice";
import posterSlice, { setPosterPath } from "./features/movie/posterSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  movie: movieSlice, // movieSlice에 있는 여러 리듀서를 하나의 루트 리듀서로 합침
});

// redux-persist (localStorage에 저장) library
const persistConfig = {
  key: "reviews",
  storage,
  whitelist: ["movie"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: {
  //   movienoteReducer: movieSlice,
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
