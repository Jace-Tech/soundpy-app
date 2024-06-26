import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import settingsSlice from "./slices/settingsSlice";
import dataSlice from "./slices/dataSlice";


const store = configureStore({
  reducer: {
    userStore: userSlice,
    settingStore: settingsSlice,
    dataStore: dataSlice
  }
})
export default store

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string>>;