import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
// @ts-ignore
import expireReducer from "redux-persist-expire";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkAction } from "redux-thunk";
import { systemReducers } from "./system/reducers";
import bannerReducer from "./banner/reducers";
import topPostReducer from "./top-posts/reducers";
import { usersReducers } from "./users/reducers";
import { mostPopularPostsReducers } from "./most-popular-posts/reducers";
import { latestVideosReducers } from "./latest-videos/reducers";
import { articlesReducers } from "./articles/reducers";
import { authReducers } from "./auth/reducers";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["system"],
  transform: [
    expireReducer("session", {
      expireSeconds: 3599, // this is 1 hr
      expiredState: {},
      autoExpire: true,
    }),
  ],
};

const rootReducer = combineReducers({
  system: persistReducer(rootPersistConfig, systemReducers),
  auth: authReducers,
  users: usersReducers,
  banner: bannerReducer,
  topPost: topPostReducer,
  mostPopularPosts: mostPopularPostsReducers,
  latestVideos: latestVideosReducers,
  articles: articlesReducers,
});

const middleware = [thunk];
const middlewareEnchancer = applyMiddleware(...middleware);
export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export const store =
  process.env.NODE_ENV === "development"
    ? createStore(persistedReducer, composeWithDevTools(middlewareEnchancer))
    : createStore(persistedReducer, middlewareEnchancer);
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void | any, AppState, null, AnyAction>;
export type AppDispatch = typeof store.dispatch;

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`REACT_APP_ENV: ${process.env.REACT_APP_ENV}`);

export const persistor = persistStore(store);
