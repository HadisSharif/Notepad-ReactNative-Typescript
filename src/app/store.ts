import AsyncStorage from '@react-native-community/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import googleSignInReducer from '../features/googleSignIn/userGoogleDataSlice';
import {useDispatch} from 'react-redux';
import userGoogleDataReducer from '../features/googleSignIn/userGoogleDataSlice';
import {combineReducers} from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reducers = combineReducers({
  theme: themeReducer,
  googleSignIn: googleSignInReducer,
  userGoogleData: userGoogleDataReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['theme', 'userGoogleData'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const currentTheme = (state: RootState) => state.theme.themeType;
export const selectGoogleSignIn = (state: RootState) => state.googleSignIn;
export const userGoogleData = (state: RootState) => state.userGoogleData;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
export default store;
