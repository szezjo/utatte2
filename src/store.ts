import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './services/api';
import storage from 'redux-persist/lib/storage';
import setupReducer from './features/setup';
import loginReducer from './features/login';
import settingsReducer from './features/settings';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedSetupReducer = persistReducer(persistConfig, setupReducer);
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    setup: persistedSetupReducer,
    login: loginReducer,
    settings: persistedSettingsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
