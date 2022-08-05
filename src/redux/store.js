import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, REGISTER, REHYDRATE, FLUSH, PAUSE, PERSIST, PURGE } from 'redux-persist';
import { rootReducer } from './reducers';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE] },
    }),
});

export const persistor = persistStore(store);
