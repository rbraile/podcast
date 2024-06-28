import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { podcastApi } from "@/services/podcast";
import podcastSelectedReducer from "@/redux/features/podcastSlice";
import episodeReducer from "@/redux/features/episodeSlice";

export const store = configureStore({
  reducer: {
    [podcastApi.reducerPath]: podcastApi.reducer,
    podcastSelectedState: podcastSelectedReducer,
    episodeState: episodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(podcastApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
